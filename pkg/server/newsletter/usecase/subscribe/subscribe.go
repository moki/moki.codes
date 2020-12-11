package subscribe

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"io"

	SubscriberEntity "github.com/moki/moki.codes/pkg/server/newsletter/domain/subscriber"
)

// Request - InputPort parameters
// @Name: 	Subscriber name
// @Email: 	Subscriber email
type Request struct {
	Name   string
	Email  string
	EncKey []byte
}

// InputPort - retrieves all Subscribers
type InputPort interface {
	Subscribe(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
}

// OutputPort - Subscribers presenter
type OutputPort interface {
	Present(response *Response)
}

// Subscriber - creates new Subscriber
type Subscriber interface {
	InputPort
}

type subscriber struct {
	repository SubscriberEntity.Repository
	presenter  OutputPort
}

// New - instantiates Subscriber usecase
func New(repository SubscriberEntity.Repository, presenter OutputPort) Subscriber {
	return &subscriber{
		repository: repository,
		presenter:  presenter,
	}
}

func encrypt(plaintext []byte, key []byte) ([]byte, error) {
	c, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(c)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	return gcm.Seal(nonce, nonce, plaintext, nil), nil
}

func (c *subscriber) Subscribe(request *Request) {
	response := &Response{Success: false}

	if request == nil {
		c.presenter.Present(response)

		return
	}

	sub := SubscriberEntity.New()

	name, err := encrypt([]byte(request.Name), request.EncKey)
	if err != nil {
		c.presenter.Present(response)

		return
	}

	email, err := encrypt([]byte(request.Email), request.EncKey)
	if err != nil {
		c.presenter.Present(response)

		return
	}

	encodedName := base64.RawStdEncoding.EncodeToString(name)
	encodedEmail := base64.RawStdEncoding.EncodeToString(email)

	sub.Name = encodedName
	sub.Email = encodedEmail

	response.Success = c.repository.Subscribe(sub) == nil

	c.presenter.Present(response)
}
