import { promises as fs, constants } from "fs";
import webpack from "webpack";
import path from "path";

require.extensions[".css"] = () => {};

import config from "./config.build";

import { ConfigurationFactory } from "./webpack/config";
import { render } from "../src/server-render";

process.env.API = config.api;

const webtofs = (route: string): string => route.replace("/", "./");

const appendDoctype = async (err: Error, html: string, route: string) => {
        html = "<!doctype html>" + html;
        writeTemplate(err, html, route);
};

const writeTemplate = async (err: Error, html: string, route: string) => {
        const { output, name } = config.templates;

        const templatePath = path.resolve(
                process.cwd(),
                output,
                webtofs(route)
        );

        await fs.mkdir(templatePath, { recursive: true });
        await fs.appendFile(path.resolve(templatePath, name), html, {
                mode: 0o666
        });
};

const copyFiles = async (from: string, to: string, rgx: RegExp) => {
        const directory = await fs.opendir(from);

        for await (const entry of directory) {
                if (entry.isDirectory()) continue;
                if (!rgx.test(entry.name)) continue;
                const src = path.resolve(from, entry.name);
                const dst = path.resolve(
                        to,
                        /\.js$/.test(entry.name)
                                ? entry.name
                                : entry.name.replace(".js", "")
                );
                fs.copyFile(src, dst);
        }
};

const templates = async () => {
        const { rgx, output, assets, sources } = config.templates;
        await fs.rmdir(path.resolve(process.cwd(), output), {
                recursive: true
        });
        /* pages
         * TODO: dynamic aggregation of articles
         */
        const routes = [
                "/",
                "/about",
                "/code",
                "/articles",
                "/articles/Hello-Blog-2020-04-08"
        ];
        let from, to;
        for (const r in routes) {
                render(routes[r], appendDoctype);
                from = path.resolve(
                        process.cwd(),
                        assets,
                        sources,
                        webtofs(routes[r])
                );
                to = path.resolve(process.cwd(), output, webtofs(routes[r]));
                copyFiles(from, to, rgx);
        }

        /* root */
        from = path.resolve(process.cwd(), assets, webtofs("/"));
        to = path.resolve(process.cwd(), output, webtofs("/"));
        copyFiles(from, to, rgx);

        /* media */
        for (const r in routes) {
                from = path.resolve(
                        process.cwd(),
                        config.entry.sources,
                        sources,
                        webtofs(routes[r])
                );
                to = path.resolve(process.cwd(), output, webtofs(routes[r]));
                copyFiles(from, to, /.jpg$/);
        }
        from = path.resolve(
                process.cwd(),
                config.entry.sources,
                sources,
                webtofs("/")
        );
        to = path.resolve(process.cwd(), output, webtofs("/"));
        copyFiles(from, to, /\.jpg$/);
};

(async () => {
        /* assets */
        const configuration = await ConfigurationFactory("build", config);
        const compiler = await webpack(configuration);

        compiler.run((err, stats) => {
                if (err || stats.hasErrors()) throw err;
                templates();
        });
})();
