package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/moki/moki.codes/pkg/server/infrastructure/middleware"
	"github.com/moki/moki.codes/pkg/server/infrastructure/router"
	"github.com/moki/moki.codes/pkg/server/infrastructure/server"
	"github.com/moki/moki.codes/pkg/server/interfaces/handler"
)

const defaultPort = "80"

func readenv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		val = fallback
	}

	return val
}

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

func main() {
	host := os.Getenv("HOST")
	port := func() uint16 {
		port, err := strconv.ParseUint(
			readenv("PORT", defaultPort), 10, 16)
		fatalErr(logErr(err))

		return uint16(port)
	}()

	staticAttributes := handler.StaticAttr{}
	staticAttributes.StaticDir = readenv("STATIC_ROOT", "build")
	staticAttributes.StaticIndex = readenv("STATIC_ENTRY", "index.html")
	staticAttributes.Compression = func() bool {
		compression, err := strconv.ParseBool(
			readenv("STATIC_COMPRESSION", "true"))
		fatalErr(logErr(err))

		return compression
	}()
	staticAttributes.CacheControlHeader = readenv("STATIC_CACHE", "no-cache")

	router, err := router.NewRouterT()
	fatalErr(logErr(err))

	allowGET := middleware.AllowMethods([]string{"GET"})
	cacheHeaders := map[string]string{"Cache-Control": staticAttributes.CacheControlHeader}
	setCache := middleware.SetHeaders(cacheHeaders)

	staticHandler := allowGET(setCache(handler.Static(&staticAttributes)))
	router.Handle("/static/", &staticHandler)

	robotsHandler := handler.ServeFile("robots.txt")
	router.Handle("/robots.txt", &robotsHandler)

	frontendEntry := staticAttributes.StaticDir + "/" + staticAttributes.StaticIndex
	rootHandler := allowGET(handler.ServeFile(frontendEntry))
	router.Handle("/", &rootHandler)

	server, err := server.NewServerT(host, port, router)
	fatalErr(logErr(err))
	fatalErr(logErr(server.Listen()))
}
