package router

import (
	"bytes"

	"github.com/valyala/fasthttp"
)

// Router is a degenerate fasthttp router implementation
type Router struct {
	routes map[string]*fasthttp.RequestHandler
}

// NewRouterT creates Router instance
func NewRouterT() (*Router, error) {
	return &Router{
		routes: map[string]*fasthttp.RequestHandler{},
	}, nil
}

// Handle makes <handler> handle requests on the request path <path>
func (r *Router) Handle(path string, handler *fasthttp.RequestHandler) {
	r.routes[path] = handler
}

// Mux is a request multiplexer
func (r *Router) Mux(ctx *fasthttp.RequestCtx) {
	key := ctx.Path()
	root := []byte("/")

	handler := r.routes[string(key)]

	for handler == nil {
		key = key[0 : bytes.LastIndex(key, root)+1]
		handler = r.routes[string(key)]
	}

	(*handler)(ctx)
}
