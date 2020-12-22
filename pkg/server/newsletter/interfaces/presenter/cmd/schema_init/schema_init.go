package schemainit

import (
	"errors"

	SchemaInitUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/schema_init"
)

type presenter struct{}

// New - instantiates cmd initialize schema presenter
func New() SchemaInitUsecase.OutputPort {
	return &presenter{}
}

func (p *presenter) Present(response *SchemaInitUsecase.Response) {
	if !response.Success {
		panic(errors.New("failed to initialize posts schema"))
	}
}
