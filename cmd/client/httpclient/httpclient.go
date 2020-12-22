package httpclient

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/moki/moki.codes/cmd/client/article"
)

// APIHTTPClient - is a way to talk to the site api
type APIHTTPClient struct {
	Port     string
	Postsurl string
}

// GetRecentPosts - retrieve recent posts from api
func (c *APIHTTPClient) GetRecentPosts(last, offset int) ([]byte, error) {
	params := fmt.Sprintf("?last=%v&offset=%v", last, offset)

	resp, err := http.Get("http://" + ":" + c.Port + c.Postsurl + params)
	if err != nil {
		return nil, fmt.Errorf("client failed to request articles: %v", err)
	}

	defer func() {
		err := resp.Body.Close()
		if err != nil {
			panic(fmt.Errorf("failed to close response body: %v", err))
		}
	}()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("api failed to send articles: %v", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("client failed to read api response: %v", err)
	}

	return body, nil
}

// PublishArticle - publishes passed article
func (c *APIHTTPClient) PublishArticle(article *article.Article) ([]byte, error) {
	a, err := json.Marshal(article.Article)
	if err != nil {
		return nil, fmt.Errorf("failed to prepare request: %v", err)
	}

	body := bytes.NewBuffer(a)

	//resp, err := http.Get("http://" + ":" + c.Port + c.Postsurl + params)
	res, err := http.Post("http://"+":"+c.Port+c.Postsurl, "application/json", body)
	if err != nil {
		return nil, fmt.Errorf("failed to publish article: %v", err)
	}

	defer func() {
		err := res.Body.Close()

		if err != nil {
			panic(fmt.Errorf("error closing response body: %v", err))
		}
	}()

	if res.StatusCode != http.StatusCreated {
		return nil, errors.New("failed to post article")
	}

	resbody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading response body: %v", err)
	}

	return resbody, nil
}

// DeleteArticle - delete articles with given slug
func (c *APIHTTPClient) DeleteArticle(slug string) ([]byte, error) {
	params := fmt.Sprintf("/%v", slug)
	client := &http.Client{}

	req, err := http.NewRequest(http.MethodDelete, "http://"+":"+c.Port+c.Postsurl+params, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to construct delete request: %v", err)
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to perform delete request")
	}

	defer func() {
		err := res.Body.Close()

		if err != nil {
			panic(fmt.Errorf("error closing response body: %v", err))
		}
	}()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to delete article, status code: %v", res.StatusCode)
	}

	resbody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading response body: %v", err)
	}

	return resbody, nil
}
