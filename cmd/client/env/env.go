package env

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
)

// Reader - reads env file and sets os env variables accordingly
type Reader struct {
	Filename string
}

func (r *Reader) Read() {
	file, err := ioutil.ReadFile(r.Filename)
	if err != nil {
		panic(err)
	}

	envs := bytes.Split(file, []byte{'\n'})

	for _, e := range envs {
		if len(e) == 0 {
			continue
		}

		kv := bytes.Split(e, []byte{'='})

		err = os.Setenv(string(kv[0]), string(kv[1]))
		if err != nil {
			panic(fmt.Errorf("failed setting env var: %v", err))
		}
	}
}
