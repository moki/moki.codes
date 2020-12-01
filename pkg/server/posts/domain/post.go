package post

import "time"

// Repository - post repository
type Repository interface {
	RetrieveLast(last, offset int) ([]*Post, error)
	RetrieveByID(id int32) (*Post, error)
	RetrieveBySlug(slug string) (*Post, error)
	Store(post *Post) error
	Init(sqlstmt string) error
	Update(post *Post) error
	DeleteBySlug(slug string) error
}

// Post - is a blog post entity
type Post struct {
	ID       int32
	Title    string
	Subtitle string
	Slug     string
	Tags     []string
	Created  time.Time
	Updated  time.Time
	Body     string
}

// New - Creates new post
func New() *Post {
	now := time.Now()

	return &Post{
		Created: now,
		Updated: now,
	}
}
