curl -i -X UPDATE localhost:4000/api/posts/blog-post-title-blog-post-subtitle-3 \
	-H "Content-Type: application/json" \
	--data-binary "@post_updated.json"
