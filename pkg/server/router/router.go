package router

import (
	router "github.com/moki/moki.codes/pkg/server/router/infrastructure"
	"github.com/valyala/fasthttp"
)

// Router is a fasthttp router
type Router interface {
	Mux(ctx *fasthttp.RequestCtx)
	Handle(path string, handler *fasthttp.RequestHandler)
}

// NewRouterT creates Router instance
func NewRouterT() Router {
	return &router.Router{
		Routes: map[string]*fasthttp.RequestHandler{},
	}
}
