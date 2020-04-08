import { h, Fragment } from "../../../lib/h";
import config from "../../../scripts/config.new.article";

import { ArticlePreview } from "../../components/article-preview";

export const Articles = ({ limit }: { limit?: number }) => {
        let articles = require("./" + config.articles.name).articles;
        articles = articles.slice(0, limit ?? articles.length);

        return (
                <div class="layout__container section">
                        {articles.map((e: any) => (
                                <a href={e.url}>
                                        <ArticlePreview
                                                preview={e}
                                                elevation={2}
                                        />
                                </a>
                        ))}
                </div>
        );
};
