package router

import (
	"bytes"

	"github.com/valyala/fasthttp"
)

// Router - is a fasthttp router
type Router struct {
	Routes map[string]*fasthttp.RequestHandler
}

// Handle - makes <handler> handle requests on the request path <path>
func (r *Router) Handle(path string, handler *fasthttp.RequestHandler) {
	if path == "/" {
		path = ""
	}

	r.Routes[path] = handler
}

// Mux is a request multiplexer
func (r *Router) Mux(ctx *fasthttp.RequestCtx) {
	key := ctx.Path()
	root := []byte("/")

	if key[len(key)-1] != '/' {
		key = append(key, '/')
	}

	handler := r.Routes[string(key)]

	for handler == nil {
		key = key[0:bytes.LastIndex(key, root)]
		handler = r.Routes[string(key)]
	}

	(*handler)(ctx)
}
