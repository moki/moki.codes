package retrieverecent

import (
	"encoding/json"
	"time"

	retrieveRecentUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/retrieve_recent"
	"github.com/valyala/fasthttp"
)

type presenter struct {
	ctx *fasthttp.RequestCtx
}

// New - instantiates http post presenter
func New(ctx *fasthttp.RequestCtx) retrieveRecentUsecase.OutputPort {
	return &presenter{
		ctx: ctx,
	}
}

type httpPost struct {
	ID       int32    `json:"id"`
	Title    string   `json:"title"`
	Subtitle string   `json:"subtitle"`
	Slug     string   `json:"slug"`
	Tags     []string `json:"tags"`
	Created  string   `json:"created"`
	Updated  string   `json:"updated"`
	Body     string   `json:"body"`
}

type httpResponse struct {
	Posts []*httpPost `json:"posts"`
}

func (p *presenter) Present(response *retrieveRecentUsecase.Response) {
	if !response.Success {
		p.ctx.Response.SetStatusCode(fasthttp.StatusInternalServerError)

		return
	}

	posts := []*httpPost{}

	for _, p := range response.Posts {
		/* temporary */
		if p == nil {
			continue
		}

		post := &httpPost{
			ID:       p.ID,
			Title:    p.Title,
			Subtitle: p.Subtitle,
			Slug:     p.Slug,
			Tags:     p.Tags,
			Created:  p.Created.Format(time.RFC1123Z),
			Updated:  p.Updated.Format(time.RFC1123Z),
			Body:     p.Body,
		}

		posts = append(posts, post)
	}

	res, err := json.MarshalIndent(httpResponse{
		Posts: posts,
	}, "", "\t")

	if err != nil {
		p.ctx.Response.SetStatusCode(fasthttp.StatusInternalServerError)

		return
	}

	p.ctx.Response.SetStatusCode(fasthttp.StatusOK)
	p.ctx.Response.SetBody(res)
}
