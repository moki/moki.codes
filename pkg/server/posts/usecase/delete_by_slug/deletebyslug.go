package deletebyslug

import (
	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

// Request - InputPort parameters
// @Slug: posts to delete slug
type Request struct {
	Slug string
}

// InputPort - retrieves all posts
type InputPort interface {
	Delete(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
}

// OutputPort - posts presenter
type OutputPort interface {
	Present(response *Response)
}

// Deleter - creates new post
type Deleter interface {
	InputPort
}

type deleter struct {
	repository post.Repository
	presenter  OutputPort
}

// New - instantiates posts usecase
func New(repository post.Repository, presenter OutputPort) Deleter {
	return &deleter{
		repository: repository,
		presenter:  presenter,
	}
}

func (d *deleter) Delete(request *Request) {
	response := &Response{Success: false}

	if request == nil {
		d.presenter.Present(response)

		return
	}

	response.Success = d.repository.DeleteBySlug(request.Slug) == nil

	d.presenter.Present(response)
}
