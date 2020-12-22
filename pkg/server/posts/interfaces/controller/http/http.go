package http

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"path/filepath"

	post "github.com/moki/moki.codes/pkg/server/posts/domain"

	CreatePresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/create"
	CreateUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/create"

	RetrieveRecentPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/retrieve_recent"
	RetrieveRecentUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/retrieve_recent"

	RetrieveBySlugPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/retrieve_by_slug"
	RetrieveBySlugUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/retrieve_by_slug"

	DeleteBySlugPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/delete_by_slug"
	DeleteBySlugUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/delete_by_slug"

	UpdateBySlugPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/update_by_slug"
	UpdateBySlugUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/update_by_slug"

	RetrieveByIDPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/http/retrieve_by_id"
	RetrieveByIDUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/retrieve_by_id"

	SchemaInitPresenter "github.com/moki/moki.codes/pkg/server/posts/interfaces/presenter/cmd/schema_init"
	SchemaInitUsecase "github.com/moki/moki.codes/pkg/server/posts/usecase/schema_init"

	"github.com/valyala/fasthttp"
)

// Posts - is a Posts component
type Posts interface {
	Handler() fasthttp.RequestHandler
}

type posts struct {
	repository post.Repository
}

const (
	resource = "posts"
)

// New - instantiates Posts component
func New(repository post.Repository) Posts {
	stmt, err := ioutil.ReadFile(
		filepath.Join("schema", "post.sql"),
	)
	if err != nil {
		panic(err)
	}

	presenter := SchemaInitPresenter.New()
	request := &SchemaInitUsecase.Request{Stmt: string(stmt)}
	schema := SchemaInitUsecase.New(repository, presenter)
	schema.Init(request)

	return &posts{
		repository: repository,
	}
}

func extractSlug(path []byte) (string, bool) {
	slugidx := bytes.LastIndex(path, []byte{'/'})
	slug := string(path[slugidx+1:])

	if len(slug) != 0 {
		return slug, true
	}

	return "", false
}

func (p *posts) handleGET(ctx *fasthttp.RequestCtx) {
	slug, ok := extractSlug(ctx.Path())

	if ok && slug != resource {
		presenter := RetrieveBySlugPresenter.New(ctx)
		request := &RetrieveBySlugUsecase.Request{
			Slug: slug,
		}
		retriever := RetrieveBySlugUsecase.New(p.repository, presenter)
		retriever.Retrieve(request)

		return
	}

	args := ctx.QueryArgs()

	if id := args.GetUintOrZero("id"); id != 0 {
		presenter := RetrieveByIDPresenter.New(ctx)
		request := &RetrieveByIDUsecase.Request{
			ID: int32(id),
		}
		retriever := RetrieveByIDUsecase.New(p.repository, presenter)
		retriever.Retrieve(request)

		return
	}

	last := args.GetUintOrZero("last")
	offset := args.GetUintOrZero("offset")

	presenter := RetrieveRecentPresenter.New(ctx)
	request := &RetrieveRecentUsecase.Request{
		Last:   last,
		Offset: offset,
	}
	retriever := RetrieveRecentUsecase.New(p.repository, presenter)
	retriever.Retrieve(request)
}

// PostHTTPRequest - is a structure used to store post json data
type postHTTPRequest struct {
	Title    string   `json:"title"`
	Subtitle string   `json:"subtitle"`
	Image    string   `json:"image"`
	Tags     []string `json:"tags"`
	Body     string   `json:"body"`
}

func isValidBody(body *postHTTPRequest) bool {
	return !(len(body.Title) == 0 ||
		len(body.Subtitle) == 0 ||
		len(body.Tags) == 0 ||
		len(body.Body) == 0)
}

func (p *posts) handlePOST(ctx *fasthttp.RequestCtx) {
	/* data verification naive todo: proper */
	body := ctx.PostBody()
	if len(body) == 0 {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	parsedBody := &postHTTPRequest{}

	err := json.Unmarshal(body, parsedBody)
	if err != nil {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	/* data validation naive todo: proper */
	if !isValidBody(parsedBody) {
		ctx.Response.SetStatusCode(fasthttp.StatusUnprocessableEntity)

		return
	}

	/* create new post usecase */
	presenter := CreatePresenter.New(ctx)
	request := &CreateUsecase.Request{
		Title:    parsedBody.Title,
		Subtitle: parsedBody.Subtitle,
		Image:    parsedBody.Image,
		Tags:     parsedBody.Tags,
		Body:     parsedBody.Body,
	}
	creator := CreateUsecase.New(p.repository, presenter)
	creator.Create(request)
}

func (p *posts) handleDELETE(ctx *fasthttp.RequestCtx) {
	slug, ok := extractSlug(ctx.Path())
	if !ok || slug == resource {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	presenter := DeleteBySlugPresenter.New(ctx)
	request := &DeleteBySlugUsecase.Request{
		Slug: slug,
	}
	deleter := DeleteBySlugUsecase.New(p.repository, presenter)
	deleter.Delete(request)
}

func (p *posts) handleUPDATE(ctx *fasthttp.RequestCtx) {
	slug, ok := extractSlug(ctx.Path())
	if !ok || slug == resource {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	body := ctx.PostBody()
	if len(body) == 0 {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	parsedBody := &postHTTPRequest{}

	err := json.Unmarshal(body, parsedBody)
	if err != nil {
		ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)

		return
	}

	if !isValidBody(parsedBody) {
		ctx.Response.SetStatusCode(fasthttp.StatusUnprocessableEntity)

		return
	}

	presenter := UpdateBySlugPresenter.New(ctx)
	request := &UpdateBySlugUsecase.Request{
		Slug:     slug,
		Title:    parsedBody.Title,
		Subtitle: parsedBody.Subtitle,
		Image:    parsedBody.Image,
		Tags:     parsedBody.Tags,
		Body:     parsedBody.Body,
	}
	updater := UpdateBySlugUsecase.New(p.repository, presenter)
	updater.Update(request)
}

func (p *posts) Handler() fasthttp.RequestHandler {
	postmethod := []byte("POST")
	getmethod := []byte("GET")
	deletemethod := []byte("DELETE")
	updatemethod := []byte("UPDATE")

	return func(ctx *fasthttp.RequestCtx) {
		if bytes.Equal(ctx.Method(), postmethod) {
			p.handlePOST(ctx)
			return
		}

		if bytes.Equal(ctx.Method(), getmethod) {
			p.handleGET(ctx)
			return
		}

		if bytes.Equal(ctx.Method(), deletemethod) {
			p.handleDELETE(ctx)
			return
		}

		if bytes.Equal(ctx.Method(), updatemethod) {
			p.handleUPDATE(ctx)
			return
		}

		ctx.Response.SetStatusCode(fasthttp.StatusNotImplemented)
	}
}
