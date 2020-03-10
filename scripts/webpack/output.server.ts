import path from "path";

import { Output } from "webpack";
import { Map } from "../../types/index";

export const outputServer = (config: Map<string>): Output => ({
        path: path.resolve(process.cwd(), config.path),
        publicPath: config.public,
        filename: config.name
});
