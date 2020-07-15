package server

import (
	"errors"
	"fmt"

	"github.com/moki/moki.codes/pkg/server/infrastructure/router"
	"github.com/valyala/fasthttp"
)

// Server Instance
type Server struct {
	port   uint16
	host   string
	router *router.Router
}

// NewServerT creates Server instance
func NewServerT(host string, port uint16, router *router.Router) (*Server, error) {
	server := Server{
		host:   host,
		port:   port,
		router: router,
	}

	if router == nil {
		return nil, errors.New("pass pointer to the router")
	}

	if port == 0 {
		server.port = 80
	}

	return &server, nil
}

// Listen makes server instance start listening
func (s *Server) Listen() error {
	fmt.Printf("server listening on %s:%d\n", s.host, s.port)

	return fasthttp.ListenAndServe(fmt.Sprintf("%s:%d", s.host, s.port), s.router.Mux)
}
