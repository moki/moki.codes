package create

import (
	CreateUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/create"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) CreateUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

func (p *presenter) Present(response *CreateUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusConflict)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusCreated)
}
