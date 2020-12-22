package schemainit

import (
	"errors"

	SchemaInitUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/schema_init"
)

type presenter struct{}

// New - instantiates cmd post presenter
func New() SchemaInitUsecase.OutputPort {
	return &presenter{}
}

func (p *presenter) Present(response *SchemaInitUsecase.Response) {
	if !response.Success {
		panic(errors.New("failed to initialize posts schema"))
	}
}
