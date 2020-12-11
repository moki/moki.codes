package subscriber

// Repository - subscriber repository
type Repository interface {
	Subscribe(subscriber *Subscriber) error
	Retrieve() ([]*Subscriber, error)
	Init(sqstmt string) error
}

// Subscriber - newsletter subscriber entity
type Subscriber struct {
	Name  string
	Email string
}

// New - Creates new post
func New() *Subscriber {
	return &Subscriber{}
}
