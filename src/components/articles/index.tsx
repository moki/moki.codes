import { h } from "preact";

export type Article = {
        title: string;
        subtitle: string;
        tags: string[];
        unixtimestamp: number;
};

export type Articles = Article[];

export type ArticlesProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
        articles: Article[];
};

export type ArticleProps = JSX.IntrinsicElements & Article;

export function Article({ title, subtitle, tags, unixtimestamp }: Article) {
        const date = new Date(unixtimestamp * 1000);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const prettydate = [
                date.getFullYear(),
                month < 10 ? `0${month}` : month,
                day < 10 ? `0${day}` : day
        ];
        return (
                <li class="article">
                        <div class="article__tags">{tags.join(" \u2022 ")}</div>
                        <div class="article__title">{title}</div>
                        <div class="article__subtitle">{subtitle}</div>
                        <div class="article__date">{prettydate.join("/")}</div>
                </li>
        );
}

export function Articles({ classes, articles }: ArticlesProps) {
        return (
                <ul class="articles">
                        {articles.map(article => (
                                <Article {...article} />
                        ))}
                </ul>
        );
}
