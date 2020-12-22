package middleware

import (
	"bytes"

	"github.com/valyala/fasthttp"
)

// AllowMethods - filters incoming requests by method type
// @methods: strings slice "GET" | "POST" | "PUT" | "DELETE"
//
// rejects request with 405 Method Not Allowed if the request type
// isnt present inside the <methods> slice
func AllowMethods(methods []string) func(fasthttp.RequestHandler) fasthttp.RequestHandler {
	ms := make([][]byte, len(methods))
	for i, m := range methods {
		ms[i] = []byte(m)
	}

	return func(h fasthttp.RequestHandler) fasthttp.RequestHandler {
		return func(ctx *fasthttp.RequestCtx) {
			method := ctx.Method()

			for _, m := range ms {
				if bytes.Equal(method, m) {
					h(ctx)
					return
				}
			}

			ctx.SetStatusCode(fasthttp.StatusMethodNotAllowed)
		}
	}
}

// SetHeaders - sets provided headers to the response
// @headers: headers map[string]string
func SetHeaders(headers map[string]string) func(fasthttp.RequestHandler) fasthttp.RequestHandler {
	return func(h fasthttp.RequestHandler) fasthttp.RequestHandler {
		return func(ctx *fasthttp.RequestCtx) {
			for k, v := range headers {
				ctx.Response.Header.Set(k, v)
			}

			h(ctx)
		}
	}
}
