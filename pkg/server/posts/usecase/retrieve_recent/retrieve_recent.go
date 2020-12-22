package retrieverecent

import (
	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

// Request - InputPort parameters
// @Last: specify the amount of posts to retrieve
// @Offset: specify offset to count @Last n posts from
type Request struct {
	Last   int
	Offset int
}

// InputPort - retrieves all posts
type InputPort interface {
	Retrieve(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
	Posts   []*post.Post
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
	response := &Response{Posts: nil, Success: false}

	if request == nil {
		r.presenter.Present(response)

		return
	}

	if request.Last == 0 {
		request.Last = 10
	}

	p, err := r.repository.RetrieveLast(request.Last, request.Offset)
	if err != nil {
		r.presenter.Present(response)

		return
	}

	response.Posts = p
	response.Success = true

	r.presenter.Present(response)
}
