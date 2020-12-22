package updatebyslug

import (
	"time"

	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

// Request - InputPort parameters
// @Title: 	posts title
// @Subtitle: 	posts subtitle
// @Tags:     	posts tags
// @Body     	posts body
type Request struct {
	Slug     string
	Title    string
	Image    string
	Subtitle string
	Tags     []string
	Body     string
}

// InputPort - retrieves all posts
type InputPort interface {
	Update(request *Request)
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

type updater struct {
	repository post.Repository
	presenter  OutputPort
}

// New - instantiates posts usecase
func New(repository post.Repository, presenter OutputPort) Creator {
	return &updater{
		repository: repository,
		presenter:  presenter,
	}
}

func (u *updater) Update(request *Request) {
	response := &Response{Success: false}

	if request == nil {
		u.presenter.Present(response)

		return
	}

	post := &post.Post{}
	post.Updated = time.Now()
	post.Title = request.Title
	post.Image = request.Image
	post.Subtitle = request.Subtitle
	post.Tags = request.Tags
	post.Body = request.Body
	post.Slug = request.Slug

	response.Success = u.repository.Update(post) == nil

	u.presenter.Present(response)
}
