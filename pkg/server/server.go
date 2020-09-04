package server

import (
	server "github.com/moki/moki.codes/pkg/server/infrastructure"
	"github.com/moki/moki.codes/pkg/server/router"
)

const defaultPort = 80

// Attr - is the server configuration
type Attr struct {
	Port   uint16
	Host   string
	Router router.Router
}

// NewServerAttrT creates default configuration for the server
func NewServerAttrT() *Attr {
	return &Attr{
		Port:   defaultPort,
		Host:   "",
		Router: nil,
	}
}

// SetPort is the Server Attribute struct port setter method
func (a *Attr) SetPort(port uint16) {
	a.Port = port
}

// SetHost is the Server Attribute struct host setter method
func (a *Attr) SetHost(host string) {
	a.Host = host
}

// SetRouter is the Server Attribute struct router setter method
func (a *Attr) SetRouter(router router.Router) {
	a.Router = router
}

// Server is the http server
type Server interface {
	Listen() error
}

// NewServerT creates Server instance
func NewServerT(attr *Attr) Server {
	if attr == nil {
		attr = NewServerAttrT()
	}

	if attr.Router == nil {
		attr.Router = router.NewRouterT()
	}

	server := server.Server{
		Host:   attr.Host,
		Port:   attr.Port,
		Router: attr.Router,
	}

	return &server
}
