import { Configuration } from "webpack";
import { entry } from "./entry";
import { ts } from "./module.rules.ts";
import { css } from "./module.rules.css";
import { images } from "./module.rules.images";
import { plugins } from "./plugins";
import { output } from "./output";

import { Map } from "../../types/index";

export const ServerConfiguration = async (
        config: Map<any>
): Promise<Configuration> => ({
        mode: "development",
        entry: entry("server", config.entry),
        module: {
                rules: [images(), ts(), css("server")]
        },
        resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        plugins: plugins("server"),
        output: output("server", config.output)
});
