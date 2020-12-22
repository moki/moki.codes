package env

import "os"

// Reader - reads env variables
type Reader struct {
}

func (r *Reader) Read(key string, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		val = fallback
	}

	return val
}
