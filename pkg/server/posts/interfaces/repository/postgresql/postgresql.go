package postgresql

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v4/pgxpool"
	post "github.com/moki/moki.codes/pkg/server/posts/domain"
)

type repository struct {
	pool *pgxpool.Pool
}

// New - instantiates postgresql repository
func New(pool *pgxpool.Pool) post.Repository {
	return &repository{
		pool: pool,
	}
}

func (r *repository) RetrieveLast(last, offset int) ([]*post.Post, error) {
	selectstmt := `
		select
			id, title, subtitle, slug, tags, created, updated
		from
			posts
		order by
			created desc
		limit
			$1
		offset
			$2;
	`

	rows, err := r.pool.Query(context.Background(), selectstmt, last, offset)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: select posts failed: %v\n", err)

		return nil, err
	}

	var posts []*post.Post

	for rows.Next() {
		post := &post.Post{}

		err = rows.Scan(&post.ID, &post.Title, &post.Subtitle, &post.Slug,
			&post.Tags, &post.Created, &post.Updated)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Scan row failed: %v\n", err)
			return posts, err
		}

		posts = append(posts, post)
	}

	return posts, nil
}

func (r *repository) RetrieveByID(id int32) (*post.Post, error) {
	selectstmt := `
		select
			id, title, subtitle, image, slug, tags, body, created, updated
		from
			posts
		where
			id = $1;
	`
	row := r.pool.QueryRow(context.Background(), selectstmt, id)
	post := &post.Post{}
	err := row.Scan(&post.ID, &post.Title, &post.Subtitle, &post.Image, &post.Slug,
		&post.Tags, &post.Body, &post.Created, &post.Updated)

	switch err {
	case pgx.ErrNoRows:
		return nil, errors.New("post not found")
	case nil:
		return post, nil
	default:
		return nil, err
	}
}

func (r *repository) RetrieveBySlug(slug string) (*post.Post, error) {
	selectstmt := `
		select
			id, title, subtitle, image, slug, tags, body, created, updated
		from
			posts
		where
			slug = $1;
	`
	row := r.pool.QueryRow(context.Background(), selectstmt, slug)
	post := &post.Post{}
	err := row.Scan(&post.ID, &post.Title, &post.Subtitle, &post.Image, &post.Slug,
		&post.Tags, &post.Body, &post.Created, &post.Updated)

	switch err {
	case pgx.ErrNoRows:
		return nil, errors.New("post not found")
	case nil:
		return post, nil
	default:
		return nil, err
	}
}

func (r *repository) Store(post *post.Post) error {
	if post == nil {
		return errors.New("provide post to store")
	}

	insertstmt := `
		insert into
			posts
			(title, subtitle, image, tags, body, created, updated)
                values
			($1, $2, $3, $4, $5, $6, $7);`

	_, err := r.pool.Exec(
		context.Background(),
		insertstmt,
		post.Title, post.Subtitle, post.Image, post.Tags, post.Body, post.Created, post.Updated)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Exec insert posts failed: %v\n", err)
		return err
	}

	return nil
}

func (r *repository) Update(post *post.Post) error {
	if post == nil {
		return errors.New("provide post to update")
	}

	updatestmt := `
		update
			posts
		set
			title = $1,
			subtitle = $2,
			tags = $3,
			body = $4,
			updated = $5,
			image = $6
		where
			slug = $7;`

	_, err := r.pool.Exec(
		context.Background(), updatestmt,
		post.Title, post.Subtitle, post.Tags,
		post.Body, post.Updated, post.Image, post.Slug)
	if err != nil {
		return err
	}

	return nil
}

func (r *repository) DeleteBySlug(slug string) error {
	deletestmt := `
		delete
			from posts
		where
			slug = $1;`

	_, err := r.pool.Exec(context.Background(), deletestmt, slug)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Exec insert posts failed: %v\n", err)
		return err
	}

	return nil
}

func (r *repository) Init(sqlstmt string) error {
	_, err := r.pool.Exec(context.Background(), sqlstmt)
	if err != nil {
		return err
	}

	return nil
}
