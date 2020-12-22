package main

import (
	"fmt"
	"os"

	"github.com/moki/moki.codes/cmd/client/article"
	"github.com/moki/moki.codes/cmd/client/env"
	"github.com/moki/moki.codes/cmd/client/httpclient"
)

func publish(client *httpclient.APIHTTPClient, dir string) []byte {
	articledir := dir
	article := &article.Article{}

	err := article.ReadFromDir(articledir)
	if err != nil {
		panic(fmt.Errorf("failed to read article meta/body: %v", err))
	}

	err = article.Prepare()
	if err != nil {
		panic(fmt.Errorf("failed to preprocess article: %v", err))
	}

	response, err := client.PublishArticle(article)
	if err != nil {
		panic(fmt.Errorf("failed publishing article: %v", err))
	}

	return response
}

func main() {
	arguments := os.Args[1:]

	Reader := &env.Reader{
		Filename: ".env",
	}
	Reader.Read()

	apiport := os.Getenv("SERVER_HOST_PORT")

	client := &httpclient.APIHTTPClient{
		Port:     apiport,
		Postsurl: "/api/posts",
	}

	command := arguments[0]

	if command != "publish" {
		panic(fmt.Errorf("command not implemented"))
	}

	response := publish(client, arguments[1])

	fmt.Println(string(response))
}

/*
	n := 10

	lastposts, err := client.GetRecentPosts(n, 0)
	if err != nil {
		panic(fmt.Errorf("api client failed retrieving posts %v", err))
	}

	fields := bytes.Split(lastposts, []byte{'\n'})
	for _, f := range fields {
		kv := bytes.Split(f, []byte{':'})
		if len(kv) != 2 {
			continue
		}

		key := bytes.TrimSpace(kv[0])

		if bytes.Equal(key, []byte("\"slug\"")) {
			val := bytes.TrimSpace(kv[1])
			l := bytes.IndexByte(val, '"')
			r := bytes.LastIndexByte(val, '"')

			if l == -1 || r == -1 {
				continue
			}

			res, err := client.DeleteArticle(string(val[l+1 : r]))
			if err != nil {
				panic(fmt.Errorf("failed to delete last articles: %v", err))
			}

			fmt.Println(string(res))
		}
	}

	//fmt.Println(string(lastposts))
*/
