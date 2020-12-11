package postgresql

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4/pgxpool"
	Subscriber "github.com/moki/moki.codes/pkg/server/newsletter/domain/subscriber"
)

type repository struct {
	pool *pgxpool.Pool
}

// New - instantiates postgresql repository
func New(pool *pgxpool.Pool) Subscriber.Repository {
	return &repository{
		pool: pool,
	}
}

func (r *repository) Retrieve() ([]*Subscriber.Subscriber, error) {
	selectstmt := `
			select
				name, email
			from
				subscribers;
		`

	rows, err := r.pool.Query(context.Background(), selectstmt)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: select subscribers failed: %v\n", err)

		return nil, err
	}

	var subs []*Subscriber.Subscriber

	for rows.Next() {
		sub := Subscriber.New()

		err = rows.Scan(&sub.Name, &sub.Email)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Scan row failed: %v\n", err)

			return nil, err
		}

		subs = append(subs, sub)
	}

	return subs, nil
}

func (r *repository) Subscribe(subscriber *Subscriber.Subscriber) error {
	if subscriber == nil {
		return errors.New("provide subscriber to subscribe")
	}

	insertstmt := `
		insert into
			subscribers
			(name, email)
                values
			($1, $2);`

	_, err := r.pool.Exec(
		context.Background(),
		insertstmt,
		subscriber.Name, subscriber.Email)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Exec insert subscriber failed: %v\n", err)
		return err
	}

	return nil
}

func (r *repository) Init(sqlstmt string) error {
	_, err := r.pool.Exec(context.Background(), sqlstmt)
	if err != nil {
		return err
	}

	return nil
}
