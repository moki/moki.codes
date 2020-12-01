package posts

import "github.com/moki/moki.codes/pkg/server/posts/interfaces"

// Attr - posts component configuration
type Attr struct {
}

// Posts - posts component
type Posts interface {
	interfaces.Retriever
}

// NewPostsT - instantiates posts component
func NewPostsT(attr *Attr) Posts {
	return nil
}
