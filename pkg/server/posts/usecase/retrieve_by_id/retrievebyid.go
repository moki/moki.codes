package retrievebyid

import (
	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

// Request - InputPort parameters
// @ID: unique post id to select by
type Request struct {
	ID int32
}

// InputPort - retrieves all posts
type InputPort interface {
	Retrieve(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
	Post    *post.Post
}

// OutputPort - posts presenter
type OutputPort interface {
	Present(response *Response)
}

// Retriever - retriever of all posts
type Retriever interface {
	InputPort
}

type retriever struct {
	repository post.Repository
	presenter  OutputPort
}

// New - instantiates posts usecase
func New(repository post.Repository, presenter OutputPort) Retriever {
	return &retriever{
		repository: repository,
		presenter:  presenter,
	}
}

func (r *retriever) Retrieve(request *Request) {
	response := &Response{Post: nil, Success: false}

	p, err := r.repository.RetrieveByID(request.ID)
	if err != nil {
		r.presenter.Present(response)

		return
	}

	response.Post = p
	response.Success = true

	r.presenter.Present(response)
}
