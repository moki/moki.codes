import path from "path";

import { promises as fs } from "fs";

import config from "./config.new.article";

type AppendOptions = {
        encoding?: string;
        mode?: number;
        flag?: string;
};

type Article = {
        id: number;
        title: string;
        prettydate: string;
        unixtimestamp: number;
        url: string;
        subtitle?: string;
        tags?: string[];
};

const prettifyDate = (date: Date): string[] => {
        const day = date.getDate();
        const month = date.getMonth() + 1;

        return [
                date.getFullYear() + "",
                month < 10 ? `0${month}` : month + "",
                day < 10 ? `0${day}` : day + ""
        ];
};

const appendFileR = async (
        path: string,
        data: string,
        options: AppendOptions | string = {
                encoding: "utf8",
                mode: 0o6666,
                flag: "a"
        },
        prefix: string = "."
) => {
        let encoding, mode, flag;

        if (
                options &&
                (typeof options === "string" || options instanceof String)
        ) {
                encoding = options as string;
                mode = 0o6666;
                flag = "a";
        } else {
                encoding = (options as AppendOptions).encoding ?? "utf8";
                mode = (options as AppendOptions).mode ?? 0o6666;
                flag = (options as AppendOptions).flag ?? "a";
        }

        await fs.appendFile(path, data, { encoding, mode, flag });
        await fs.rename(path, path);
};

const handleArticleExists = async (e: Error, articles: { amount: number }) => {
        articles.amount = articles.amount - 1;

        try {
                await appendFileR(
                        path.resolve(
                                process.cwd(),
                                config.articles.path,
                                config.articles.name
                        ),
                        JSON.stringify(articles, null, "\t"),
                        { flag: "w" }
                );
        } catch (e) {
                console.error(
                        `Failed to update ${config.articles.name}\nSchema corrupted.`
                );
        }

        throw e;
};

(async () => {
        if (process.argv.length !== 5)
                throw new Error("No name provided for the article.");

        let articlesfd;
        let articles: {
                amount: number;
                articles: Article[];
        };

        try {
                articlesfd = await fs.open(
                        path.resolve(
                                process.cwd(),
                                config.articles.path,
                                config.articles.name
                        ),
                        "r"
                );
        } catch (e) {
                console.error(`Failed to open ${config.articles.name}`);
                throw e;
        }

        try {
                articles = JSON.parse(await fs.readFile(articlesfd, "utf-8"));
        } catch (e) {
                console.error(`Failed to read ${config.articles.name}`);
                throw e;
        }

        let article: Partial<Article> = {
                title: process.argv[4],
                id: articles.amount
        };

        articles.amount = articles.amount + 1;

        try {
                await appendFileR(
                        path.resolve(
                                process.cwd(),
                                config.articles.path,
                                config.articles.name
                        ),
                        JSON.stringify(articles, null, "\t"),
                        { flag: "w" }
                );
        } catch (e) {
                console.error(`Failed to update ${config.articles.name}`);
                throw e;
        }

        article.unixtimestamp = Date.now();
        article.subtitle = "";
        article.tags = [""];
        article.prettydate = prettifyDate(new Date(article.unixtimestamp)).join(
                "-"
        );
        article.unixtimestamp = Math.floor(article.unixtimestamp / 1000);
        article.url = `${config.article.url}/${article
                .title!.split(" ")
                .join("-")}-${article.prettydate}`;

        const articlefsname = `${article.title!.split(" ").join("-")}-${
                article.prettydate
        }`;

        try {
                await fs.mkdir(
                        path.resolve(
                                process.cwd(),
                                config.article.path,
                                articlefsname
                        )
                );
                await appendFileR(
                        path.resolve(
                                process.cwd(),
                                config.article.path,
                                articlefsname,
                                config.article.name
                        ),
                        JSON.stringify(article, null, "\t"),
                        { flag: "w" }
                );

                articles.articles.unshift(article as Article);
                await appendFileR(
                        path.resolve(
                                process.cwd(),
                                config.articles.path,
                                config.articles.name
                        ),
                        JSON.stringify(articles, null, "\t"),
                        { flag: "w" }
                );
        } catch (e) {
                if (e.code === "EEXIST") {
                        console.error(
                                `Article with title: ${articlefsname} already exists`
                        );

                        await handleArticleExists(e, articles);
                }

                throw e;
        }
})();
