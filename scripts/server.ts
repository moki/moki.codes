import express, { Request, Response, NextFunction } from "express";
import webpack from "webpack";
import wdm from "webpack-dev-middleware";
import whm from "webpack-hot-middleware";

import config from "./config.server";

import { ConfigurationFactory } from "./webpack/config";

require.extensions[".css"] = () => {};

(async () => {
        const configuration = await ConfigurationFactory("server", config);
        const compiler = await webpack(configuration);
        const app = express();

        app.use(
                wdm(compiler, {
                        publicPath: configuration!.output!.publicPath!
                })
        );
        app.use(whm(compiler));

        app.get("*", (req: Request, res: Response, next: NextFunction) => {
                if (req.path === "/favicon.ico") return;
                require("../src/server-render").render(
                        req.path,
                        (err: Error, page: string) => {
                                if (err) return next(err);
                                res.send(page);
                        }
                );
        });

        app.listen(config.port, () => {
                console.info(`development server localhost:${config.port}`);
        });
})();
