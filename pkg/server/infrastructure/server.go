package server

import (
	"fmt"

	"github.com/moki/moki.codes/pkg/server/router"
	"github.com/valyala/fasthttp"
)

// Server Instance
type Server struct {
	Port   uint16
	Host   string
	Router router.Router
}

// Listen makes server instance start listening
func (s *Server) Listen() error {
	fmt.Printf("server listening on %s:%d\n", s.Host, s.Port)

	return fasthttp.ListenAndServe(fmt.Sprintf("%s:%d", s.Host, s.Port), s.Router.Mux)
}
