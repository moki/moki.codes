package subscribe

import (
	SubscribeUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/subscribe"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) SubscribeUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

func (p *presenter) Present(response *SubscribeUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusConflict)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusCreated)
}
