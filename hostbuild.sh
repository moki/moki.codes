CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o bin/server cmd/server/server.go && chmod +x bin/server
