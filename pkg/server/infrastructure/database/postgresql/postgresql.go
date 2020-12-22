package postgresql

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

const (
	connectionAttempts = 10
	backoffDelta       = 2
)

// DatabaseArgs - is a postgresql database handler configuration
// @Connstr: 		  postgresql connection string
// @ReconnectionAttempts: maximum amount of the recoonection attempts
// @BackoffDelta: 	  reconnection attempts backing off growth delta
type DatabaseArgs struct {
	Connstr            string
	ConnectionAttempts int
	BackoffDelta       time.Duration
	Sleep              time.Duration
}

// NewDatabaseArgs - instantiates new database arguments config structure
// @connstr: connection string, mandatory parameter
func NewDatabaseArgs(connstr string) (*DatabaseArgs, error) {
	if connstr == "" {
		return nil, errors.New("provide non-empty database connection string")
	}

	return &DatabaseArgs{
		Connstr:            connstr,
		ConnectionAttempts: connectionAttempts,
		BackoffDelta:       backoffDelta,
		Sleep:              time.Second,
	}, nil
}

// Database - is a postgresql database handler
// @Pool: postgresql connection pool
type Database struct {
	Pool *pgxpool.Pool
	DatabaseArgs
}

// New - instantiates new database handler, with DatabaseArgs <args>
func New(args *DatabaseArgs) (*Database, error) {
	if args == nil {
		return nil, errors.New("provide database arguments struct DatabaseArgs")
	}

	db := &Database{
		Pool:         nil,
		DatabaseArgs: *args,
	}

	return db, nil
}

// Connect - connects to the postgresql database instance
func (db *Database) Connect() error {
	sleep := db.Sleep

	for attempts := db.ConnectionAttempts; attempts > 0; attempts-- {
		pool, err := pgxpool.Connect(context.Background(), db.Connstr)
		if err == nil {
			db.Pool = pool
			return nil
		}

		fmt.Fprintf(
			os.Stderr,
			"failed to connect to db: %+v\nattempts left: %v, retry in: %v",
			err, attempts, sleep)

		time.Sleep(sleep)
		sleep = db.BackoffDelta * sleep
	}

	return errors.New("database connection failed")
}

// Disconnect - closes connection to the postgresql database instance
func (db *Database) Disconnect() error {
	db.Pool.Close()

	return nil
}
