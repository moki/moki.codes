package deletebyslug

import (
	DeleteBySlugUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/delete_by_slug"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) DeleteBySlugUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

func (p *presenter) Present(response *DeleteBySlugUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusNotFound)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusOK)
}
