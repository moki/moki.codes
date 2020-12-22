curl -i -X POST localhost:4000/api/newsletter/subscribe \
	-H "Content-Type: application/json" \
	--data-binary "@subscriber.json"
