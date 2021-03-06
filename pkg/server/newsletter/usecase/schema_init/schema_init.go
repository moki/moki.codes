package schemainit

import (
	Subscriber "github.com/moki/moki.codes/pkg/server/newsletter/domain/subscriber"
)

// Request - InputPort parameters
type Request struct {
	Stmt string
}

// InputPort - initializes newsletter schema
type InputPort interface {
	Init(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
}

// OutputPort - schema presenter
type OutputPort interface {
	Present(response *Response)
}

// Schema - initializer of post schema
type Schema interface {
	InputPort
}

type schema struct {
	repository Subscriber.Repository
	presenter  OutputPort
}

// New - instantiates schema usecase
func New(repository Subscriber.Repository, presenter OutputPort) Schema {
	return &schema{
		repository: repository,
		presenter:  presenter,
	}
}

func (s *schema) Init(request *Request) {
	response := &Response{Success: false}

	if request == nil || request.Stmt == "" {
		s.presenter.Present(response)

		return
	}

	stmt := request.Stmt

	err := s.repository.Init(stmt)
	if err != nil {
		s.presenter.Present(response)

		return
	}

	response.Success = true
	s.presenter.Present(response)
}
