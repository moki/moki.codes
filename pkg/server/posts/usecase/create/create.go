package create

import (
	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

// Request - InputPort parameters
// @Title: 	posts title
// @Subtitle: 	posts subtitle
// @Tags:     	posts tags
// @Body     	posts body
type Request struct {
	Title    string
	Subtitle string
	Tags     []string
	Body     string
}

// InputPort - retrieves all posts
type InputPort interface {
	Create(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
}

// OutputPort - posts presenter
type OutputPort interface {
	Present(response *Response)
}

// Creator - creates new post
type Creator interface {
	InputPort
}

type creator struct {
	repository post.Repository
	presenter  OutputPort
}

// New - instantiates posts usecase
func New(repository post.Repository, presenter OutputPort) Creator {
	return &creator{
		repository: repository,
		presenter:  presenter,
	}
}

func (c *creator) Create(request *Request) {
	response := &Response{Success: false}

	if request == nil {
		c.presenter.Present(response)

		return
	}

	post := post.New()
	post.Title = request.Title
	post.Subtitle = request.Subtitle
	post.Tags = request.Tags
	post.Body = request.Body

	response.Success = c.repository.Store(post) == nil

	c.presenter.Present(response)
}
