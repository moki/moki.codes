package handler

import (
	"time"

	"github.com/valyala/fasthttp"
)

// NotFound - 404 not found handler factory
func NotFound() fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		ctx.SetStatusCode(fasthttp.StatusNotFound)
	}
}

// Moved - resource moved handler factory
func Moved(path string) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		ctx.Redirect(path, 301)
	}
}

// ServeFile - handler serves file filename to the client
func ServeFile(filename string) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		ctx.SendFile(filename)
	}
}

// StaticAttr - Static handler factory attributes
type StaticAttr struct {
	StaticDir          string
	StaticIndex        string
	CacheControlHeader string
	Compression        bool
	CacheFor           time.Duration
	NotFound           *fasthttp.RequestHandler
}

// Static - static file server handler factory
func Static(attr *StaticAttr) fasthttp.RequestHandler {
	if attr == nil {
		attr = &StaticAttr{
			StaticDir:          "root",
			StaticIndex:        "index.html",
			CacheControlHeader: "no-cache",
			Compression:        true,
			CacheFor:           60 * 60 * time.Second,
		}
	}

	fs := &fasthttp.FS{
		Root:          attr.StaticDir,
		IndexNames:    []string{attr.StaticIndex},
		Compress:      attr.Compression,
		CacheDuration: attr.CacheFor,
	}

	if attr.NotFound == nil {
		fs.PathNotFound = NotFound()
	}

	return fs.NewRequestHandler()
}
