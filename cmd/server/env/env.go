package env

import env "github.com/moki/moki.codes/cmd/server/env/infrastructure"

// Reader - reads env variables
type Reader interface {
	Read(key string, fallback string) string
}

// NewReaderT - creates env reader
func NewReaderT() Reader {
	return &env.Reader{}
}
