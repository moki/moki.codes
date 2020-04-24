import { Configuration, Rule, Output } from "webpack";
import { entry } from "./entry";
import { ts } from "./module.rules.ts";
import { css } from "./module.rules.css";
import { images } from "./module.rules.images";
import { plugins } from "./plugins";
import { output } from "./output";
import { optimization } from "./optimization";

import { Map } from "../../types/index";

export const BuildConfiguration = async (
        config: Map<any>
): Promise<Configuration> => ({
        mode: "production",
        entry: await entry("build", config.entry),
        module: {
                rules: [ts(), css("build"), images()]
        },
        resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        plugins: plugins("build"),
        optimization: optimization("build", config.optimization),
        output: output("build", config.output)
});
