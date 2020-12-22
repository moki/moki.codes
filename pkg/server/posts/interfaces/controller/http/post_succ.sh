curl -i -X POST localhost:4000/api/posts \
	-H "Content-Type: application/json" \
	--data-binary "@post.json"
