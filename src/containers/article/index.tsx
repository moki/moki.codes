import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { handleClick } from "src/components/router-link";
import { useLocation } from "wouter-preact";

/* container */
import { Article, ArticleProps } from "src/components/article";

export type ArticleContainerProps = {
        endpoint: string;
};

const initial_state = {
        id: "",
        slug: "",
        title: "",
        subtitle: "",
        body: "",
        tags: [""],
        created: new Date(),
        updated: new Date(),
        image: "",
        loading: true,
};

export function ArticleContainer({ endpoint }: ArticleContainerProps) {
        const [article, setArticle] = useState<ArticleProps>(initial_state);
        const [location, setLocation] = useLocation();

        useEffect(() => {
                let mounted = true;
                const paths = window.location.pathname.split("/");
                const slug = paths.find(
                        (path, i) => paths[i - 1] === "article"
                );

                const request = new XMLHttpRequest();

                request.addEventListener("load", (e) => {
                        if (!mounted) return;
                        if (!e.target) return;

                        const status = request.status;
                        if (status !== 200) {
                                setLocation("/notfound");
                                return;
                        }

                        const response = JSON.parse(request.response);
                        response.post.created = new Date(response.post.created);
                        response.post.updated = new Date(response.post.updated);

                        setArticle((s) => ({
                                loading: false,
                                ...response.post,
                        }));
                });

                request.open("GET", `${endpoint}/${slug}`);
                request.send();

                return () => (mounted = false);
        }, []);

        return <Article {...article} />;
}
