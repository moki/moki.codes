import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { Article, Articles } from "src/components/articles";

export type ArticlesContainer = { limit?: number; endpoint: string };

export type ArticlesContainerProps = JSX.IntrinsicElements & ArticlesContainer;

export type ArticlesContainerState = {
        articles: Article[];
        loading: boolean;
};

const article_stab = {
        id: null,
        title: "",
        subtitle: "",
        tags: [""],
        created: new Date(),
};

const initial_state: ArticlesContainerState = {
        loading: true,
        articles: [],
};

function transformRes(response: map<string>) {
        return {
                ...response,
                created: new Date(response.created),
                updated: new Date(response.updated),
        };
}

export function ArticlesContainer({
        endpoint,
        limit = 10,
}: ArticlesContainerProps) {
        initial_state.articles = Array(limit).fill(article_stab);

        /* TODO: memo request */

        const [articlesState, setArticles] = useState<ArticlesContainerState>(
                initial_state
        );

        useEffect(() => {
                let mounted = true;

                const request = new XMLHttpRequest();

                request.addEventListener("load", (e) => {
                        if (!mounted) return;
                        if (!e.target) return;

                        const status = request.status;

                        const posts = JSON.parse(request.response).posts.map(
                                transformRes
                        );

                        if (status === 200)
                                setArticles((s) => ({
                                        loading: false,
                                        articles: posts,
                                }));
                });

                request.open("GET", `${endpoint}?last=3`);

                request.send();

                return () => (mounted = false);
        }, []);

        return (
                <Articles
                        articles={articlesState.articles}
                        loading={articlesState.loading}
                />
        );
}
