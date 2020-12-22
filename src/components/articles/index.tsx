import { h } from "preact";
import { handleClick } from "src/components/router-link";

export type Article = {
        id: string;
        title: string;
        subtitle: string;
        tags: string[];
        slug: string;
        created: Date;
};

export type Articles = Article[];

export type ArticlesProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
        articles: Article[];
        loading: boolean;
};

export type ArticleProps = JSX.IntrinsicElements &
        Article & {
                loading: boolean;
        };

export function Article({
        id,
        title,
        subtitle,
        tags,
        created,
        slug,
        loading,
}: ArticleProps) {
        return (
                <li
                        key={`${id}${slug}`}
                        class={`article-preview ${loading ? "skeleton" : ""}`}
                        onClick={handleClick(`article/${slug}`)}
                >
                        <div class="article-preview__tags">
                                {tags.join(" \u2022 ")}
                        </div>
                        <div class="article-preview__title">{title}</div>
                        <div class="article-preview__subtitle">{subtitle}</div>
                        <div class="article-preview__date">
                                {created.toLocaleDateString()}
                        </div>
                </li>
        );
}

export function Articles({ classes, articles, loading }: ArticlesProps) {
        return (
                <ul class="articles-preview">
                        {!loading
                                ? articles.map((article) => (
                                          <Article
                                                  {...article}
                                                  loading={loading}
                                          />
                                  ))
                                : ""}
                </ul>
        );
}
