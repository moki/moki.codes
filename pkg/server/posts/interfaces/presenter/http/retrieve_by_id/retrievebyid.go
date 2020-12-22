package retrievebyid

import (
	"encoding/json"
	"time"

	retrieveByIDUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/retrieve_by_id"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) retrieveByIDUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

type httpPost struct {
	ID       int32    `json:"id"`
	Title    string   `json:"title"`
	Subtitle string   `json:"subtitle"`
	Image    string   `json:"image"`
	Slug     string   `json:"slug"`
	Tags     []string `json:"tags"`
	Created  string   `json:"created"`
	Updated  string   `json:"updated"`
	Body     string   `json:"body"`
}

type httpResponse struct {
	Post *httpPost `json:"post"`
}

func (p *presenter) Present(response *retrieveByIDUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusNotFound)

		return
	}

	post := &httpPost{}
	post.ID = response.Post.ID
	post.Title = response.Post.Title
	post.Subtitle = response.Post.Subtitle
	post.Image = response.Post.Image
	post.Slug = response.Post.Slug
	post.Tags = response.Post.Tags
	post.Created = response.Post.Created.Format(time.RFC1123Z)
	post.Updated = response.Post.Updated.Format(time.RFC1123Z)
	post.Body = response.Post.Body

	res, err := json.MarshalIndent(httpResponse{
		Post: post,
	}, "", "\t")

	if err != nil {
		p.ctx.Response.SetStatusCode(fasthttp.StatusInternalServerError)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusOK)
	p.ctx.Response.SetBody(res)
}
