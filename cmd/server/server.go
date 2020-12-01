package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/moki/moki.codes/cmd/server/env"
	"github.com/moki/moki.codes/pkg/server"
	"github.com/moki/moki.codes/pkg/server/handler"
	"github.com/moki/moki.codes/pkg/server/middleware"
	"github.com/moki/moki.codes/pkg/server/router"

	Database "github.com/moki/moki.codes/pkg/server/infrastructure/database/postgresql"

	PostsController "github.com/moki/moki.codes/pkg/server/posts/interfaces/controller/http"
	PostsRepository "github.com/moki/moki.codes/pkg/server/posts/interfaces/repository/postgresql"
)

const defaultPort = "80"

func logErr(err error) error {
	fmt.Fprint(os.Stderr, err)

	return err
}

func initializeHandlers(router router.Router, envReader env.Reader, database *Database.Database) {
	staticAttributes := handler.StaticAttr{}
	staticAttributes.StaticDir = envReader.Read("STATIC_ROOT", "build")
	staticAttributes.StaticIndex = envReader.Read("STATIC_ENTRY", "index.html")
	staticAttributes.Compression = func() bool {
		compression, err := strconv.ParseBool(
			envReader.Read("STATIC_COMPRESSION", "true"))
		if err != nil {
			panic(logErr(err))
		}

		return compression
	}()

	staticCacheControlHeader := envReader.Read("STATIC_CACHE_POLICY", "no-cache")
	staticHeaders := map[string]string{"Cache-Control": staticCacheControlHeader}

	setCache := middleware.SetHeaders(staticHeaders)
	allowGET := middleware.AllowMethods([]string{"GET"})

	staticHandler := allowGET(setCache(handler.Static(&staticAttributes)))
	router.Handle("/static", &staticHandler)

	robotsHandler := handler.ServeFile("robots.txt")
	router.Handle("/robots.txt", &robotsHandler)

	frontendEntry := staticAttributes.StaticDir + "/" + staticAttributes.StaticIndex
	rootHandler := allowGET(handler.ServeFile(frontendEntry))
	router.Handle("/", &rootHandler)

	allowedPostsMethods := []string{"GET"}
	if envReader.Read("GOLANG_ENV", "production") == "development" {
		allowedPostsMethods = append(
			allowedPostsMethods,
			"POST", "UPDATE", "DELETE")
	}

	postsRepository := PostsRepository.New(database.Pool)
	postsController := PostsController.New(postsRepository)
	postsHandler := middleware.AllowMethods(
		allowedPostsMethods,
	)(postsController.Handler())
	router.Handle("/api/posts", &postsHandler)
}

func createServer(router router.Router, envReader env.Reader) server.Server {
	host := os.Getenv("HOST")
	port := func() uint16 {
		port, err := strconv.ParseUint(
			envReader.Read("PORT", defaultPort), 10, 16)
		if err != nil {
			panic(logErr(err))
		}

		return uint16(port)
	}()

	serverAttr := server.NewServerAttrT()
	serverAttr.SetHost(host)
	serverAttr.SetPort(port)
	serverAttr.SetRouter(router)

	return server.NewServerT(serverAttr)
}

func debugdir() {
	err := filepath.Walk(".",
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if info.IsDir() && (info.Name() == "node_modules" || info.Name() == ".git") {
				fmt.Printf("skipping a dir without errors: %+v \n", info.Name())
				return filepath.SkipDir
			}
			fmt.Println(path, info.Size())
			return nil
		})
	if err != nil {
		log.Println(err)
	}
}

func main() {
	envReader := env.NewReaderT()

	exenv := envReader.Read("EXENV", "DEV")
	if exenv == "DEV" {
		debugdir()
	}

	dbhost := envReader.Read("PERSISTENT_STORAGE_HOST", "")
	dbport := envReader.Read("PERSISTENT_STORAGE_PORT", "5432")
	dbuser := envReader.Read("PERSISTENT_STORAGE_USER", "postgres")
	dbpw := envReader.Read("PERSISTENT_STORAGE_PASSWORD", "postgres")
	dbname := envReader.Read("PERSISTENT_STORAGE_DB_NAME", "postgres")

	connstr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbhost,
		dbport,
		dbuser,
		dbpw,
		dbname,
	)

	databaseArgs, err := Database.NewDatabaseArgs(connstr)
	if err != nil {
		panic(logErr(err))
	}

	database, err := Database.New(databaseArgs)
	if err != nil {
		panic(logErr(err))
	}

	err = database.Connect()
	if err != nil {
		panic(logErr(err))
	}

	defer func() {
		err = database.Disconnect()
		if err != nil {
			panic(logErr(err))
		}
	}()

	router := router.NewRouterT()
	initializeHandlers(router, envReader, database)

	server := createServer(router, envReader)

	err = server.Listen()
	if err != nil {
		panic(logErr(err))
	}
}
