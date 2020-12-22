package http

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	Subscriber "github.com/moki/moki.codes/pkg/server/newsletter/domain/subscriber"

	SchemaInitPresenter "github.com/moki/moki.codes/pkg/server/newsletter/interfaces/presenter/cmd/schema_init"
	SchemaInitUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/schema_init"

	SubscribePresenter "github.com/moki/moki.codes/pkg/server/newsletter/interfaces/presenter/http/subscribe"
	SubscribeUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/subscribe"

	RetrievePresenter "github.com/moki/moki.codes/pkg/server/newsletter/interfaces/presenter/cmd/retrieve"
	RetrieveUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/retrieve"

	"github.com/dlclark/regexp2"
	"github.com/valyala/fasthttp"
)

var (
	//emailrgx = regexp2.MustCompile("^[^\\s@]+@[^|\\s@]+\\.[^\\s@]+$", 0)
	emailrgx = regexp2.MustCompile("^[^\\s@!#$%&'*]+@[^\\s@!#$%&'*]+\\.[^\\s@!#$%&'*]+$", 0)
	namergx  = regexp2.MustCompile("^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$", 0)
)

// Newsletter - is a Posts component
type Newsletter interface {
	Handler() fasthttp.RequestHandler
}

type newsletter struct {
	repository Subscriber.Repository
	enckey     []byte
}

// New - instantiates Newsletter component
func New(repository Subscriber.Repository) Newsletter {
	stmt, err := ioutil.ReadFile(
		filepath.Join("schema", "newsletter.sql"),
	)
	if err != nil {
		panic(err)
	}

	enckey := os.Getenv("ENCRYPTION_KEY")
	if enckey == "" {
		panic(errors.New("provide encryption key"))
	}

	env := os.Getenv("GOLANG_ENV")
	if env == "development" {
		fmt.Println("encryption key: ", enckey)
	}

	presenter := SchemaInitPresenter.New()
	request := &SchemaInitUsecase.Request{Stmt: string(stmt)}
	schema := SchemaInitUsecase.New(repository, presenter)
	schema.Init(request)

	return &newsletter{
		repository: repository,
		enckey:     []byte(enckey),
	}
}

// PostHTTPRequest - is a structure used to store post json data
type postHTTPRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func rgxmch(s string, r *regexp2.Regexp) bool {
	doesmatch, err := r.MatchString(s)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to perform regexp mathcing: %v", err)

		return false
	}

	return doesmatch
}

func isValidBody(body *postHTTPRequest) bool {
	email := body.Email
	if email == "" || len(email) > 254 || !rgxmch(email, emailrgx) {
		return false
	}

	name := body.Name
	if name == "" || len(name) > 30 || !rgxmch(name, namergx) {
		return false
	}

	return true
}

func (n *newsletter) handlePOST(ctx *fasthttp.RequestCtx) {
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

	parsedBody.Name = strings.ToLower(parsedBody.Name)
	parsedBody.Email = strings.ToLower(parsedBody.Email)

	if !isValidBody(parsedBody) {
		ctx.Response.SetStatusCode(fasthttp.StatusUnprocessableEntity)

		return
	}

	presenter := SubscribePresenter.New(ctx)
	request := &SubscribeUsecase.Request{
		Name:   parsedBody.Name,
		Email:  parsedBody.Email,
		EncKey: n.enckey,
	}
	subscribe := SubscribeUsecase.New(n.repository, presenter)
	subscribe.Subscribe(request)
}

func (n *newsletter) handleGET(ctx *fasthttp.RequestCtx) {
	presenter := RetrievePresenter.New()
	request := &RetrieveUsecase.Request{
		EncKey: n.enckey,
	}
	retriever := RetrieveUsecase.New(n.repository, presenter)
	retriever.Retrieve(request)
}

func (n *newsletter) Handler() fasthttp.RequestHandler {
	getmethod := []byte("GET")
	postmethod := []byte("POST")

	return func(ctx *fasthttp.RequestCtx) {
		if bytes.Equal(ctx.Method(), getmethod) {
			n.handleGET(ctx)
			return
		}

		if bytes.Equal(ctx.Method(), postmethod) {
			n.handlePOST(ctx)
			return
		}

		ctx.Response.SetStatusCode(fasthttp.StatusNotImplemented)
	}
}
