package article

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path"
)

// RequestBody - article json api expects
type RequestBody struct {
	Title    string   `json:"title"`
	Subtitle string   `json:"subtitle"`
	Body     string   `json:"body"`
	Image    string   `json:"image"`
	Tags     []string `json:"tags"`
}

// Article - represents article draft
type Article struct {
	meta    []byte
	body    []byte
	Article *RequestBody
}

// ReadFromDir - reads article meta and body from
// meta - <dir>/meta.json
// body - <dir>/body.json
// loads it into underlying struct
func (a *Article) ReadFromDir(dir string) error {
	meta, err := ioutil.ReadFile(path.Join(dir, "meta.json"))
	if err != nil {
		return fmt.Errorf("failed to read articles meta: %v", err)
	}

	a.meta = meta

	body, err := ioutil.ReadFile(path.Join(dir, "body.json"))
	if err != nil {
		return fmt.Errorf("failed to read articles body: %v", err)
	}

	a.body = body

	return nil
}

// Prepare - prepares sendable json from article
func (a *Article) Prepare() error {
	a.Article = &RequestBody{}

	err := json.Unmarshal(a.meta, a.Article)
	if err != nil {
		return fmt.Errorf("failed to parse meta into article: %v", err)
	}

	a.Article.Body = string(a.body)

	return nil
}
