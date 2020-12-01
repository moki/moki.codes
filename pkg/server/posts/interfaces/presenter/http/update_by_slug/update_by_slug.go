package update

import (
	UpdateBySlugUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/update_by_slug"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) UpdateBySlugUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

func (p *presenter) Present(response *UpdateBySlugUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusConflict)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusCreated)
}
