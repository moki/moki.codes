package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/moki/moki.codes/cmd/server/env"
	"github.com/moki/moki.codes/pkg/server"
	"github.com/moki/moki.codes/pkg/server/handler"
	"github.com/moki/moki.codes/pkg/server/middleware"
	"github.com/moki/moki.codes/pkg/server/router"
)

const defaultPort = "80"

func logErr(err error) error {
	if err != nil {
		fmt.Println(err)
	}

	return err
}

func fatalErr(err error) {
	if err != nil {
		os.Exit(1)
	}
}

func initializeHandlers(router router.Router, envReader env.Reader) {
	staticAttributes := handler.StaticAttr{}
	staticAttributes.StaticDir = envReader.Read("STATIC_ROOT", "build")
	staticAttributes.StaticIndex = envReader.Read("STATIC_ENTRY", "index.html")
	staticAttributes.Compression = func() bool {
		compression, err := strconv.ParseBool(
			envReader.Read("STATIC_COMPRESSION", "true"))
		fatalErr(logErr(err))

		return compression
	}()

	staticCacheControlHeader := envReader.Read("STATIC_CACHE_POLICY", "no-cache")

	staticHeaders := map[string]string{"Cache-Control": staticCacheControlHeader}

	setCache := middleware.SetHeaders(staticHeaders)
	allowGET := middleware.AllowMethods([]string{"GET"})

	staticHandler := allowGET(setCache(handler.Static(&staticAttributes)))
	router.Handle("/static/", &staticHandler)

	robotsHandler := handler.ServeFile("robots.txt")
	router.Handle("/robots.txt", &robotsHandler)

	frontendEntry := staticAttributes.StaticDir + "/" + staticAttributes.StaticIndex
	rootHandler := allowGET(handler.ServeFile(frontendEntry))
	router.Handle("/", &rootHandler)
}

func createServer(router router.Router, envReader env.Reader) server.Server {
	host := os.Getenv("HOST")
	port := func() uint16 {
		port, err := strconv.ParseUint(
			envReader.Read("PORT", defaultPort), 10, 16)
		fatalErr(logErr(err))

		return uint16(port)
	}()

	serverAttr := server.NewServerAttrT()
	serverAttr.SetHost(host)
	serverAttr.SetPort(port)
	serverAttr.SetRouter(router)

	return server.NewServerT(serverAttr)
}

func main() {
	envReader := env.NewReaderT()

	router := router.NewRouterT()
	initializeHandlers(router, envReader)

	server := createServer(router, envReader)

	fatalErr(logErr(server.Listen()))
}
