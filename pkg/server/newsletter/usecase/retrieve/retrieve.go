package retrieve

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"

	SubscriberEntity "github.com/moki/moki.codes/pkg/server/newsletter/domain/subscriber"
)

// Request - InputPort parameters
type Request struct {
	EncKey []byte
}

// InputPort - retrieves all Subscribers
type InputPort interface {
	Retrieve(request *Request)
}

// Response - OutputPort parameters
type Response struct {
	Success bool
	Subs    []*SubscriberEntity.Subscriber
}

// OutputPort - Subscribers presenter
type OutputPort interface {
	Present(response *Response)
}

// Retriever - creates new Subscriber
type Retriever interface {
	InputPort
}

type retriever struct {
	repository SubscriberEntity.Repository
	presenter  OutputPort
}

// New - instantiates Retrieve usecase
func New(repository SubscriberEntity.Repository, presenter OutputPort) Retriever {
	return &retriever{
		repository: repository,
		presenter:  presenter,
	}
}

func decrypt(ciphertext []byte, key []byte) ([]byte, error) {
	c, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(c)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return nil, errors.New("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]

	return gcm.Open(nil, nonce, ciphertext, nil)
}

func (r *retriever) Retrieve(request *Request) {
	response := &Response{Success: false}

	if request == nil || request.EncKey == nil {
		r.presenter.Present(response)

		return
	}

	subs, err := r.repository.Retrieve()
	if err != nil {
		r.presenter.Present(response)

		return
	}

	for _, sub := range subs {
		decodedName, err := base64.RawStdEncoding.DecodeString(sub.Name)
		if err != nil {
			r.presenter.Present(response)

			return
		}

		decodedEmail, err := base64.RawStdEncoding.DecodeString(sub.Email)
		if err != nil {
			r.presenter.Present(response)

			return
		}

		decryptedName, err := decrypt(decodedName, request.EncKey)
		if err != nil {
			r.presenter.Present(response)

			return
		}

		decryptedEmail, err := decrypt(decodedEmail, request.EncKey)
		if err != nil {
			r.presenter.Present(response)

			return
		}

		sub.Name = string(decryptedName)
		sub.Email = string(decryptedEmail)
	}

	response.Success = true
	response.Subs = subs

	r.presenter.Present(response)
}
