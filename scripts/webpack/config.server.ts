import { Configuration } from "webpack";
import { entry } from "./entry";
import { ts } from "./module.rules.ts";
import { css } from "./module.rules.css";
import { plugins } from "./plugins";
import { output } from "./output";

export const ServerConfiguration = async (): Promise<Configuration> => ({
        mode: "development",
        entry: entry("server"),
        module: {
                rules: [ts(), css("server")]
        },
        resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        plugins: plugins("server"),
        output: output("server")
});
