import _path from "path";
import { Output } from "webpack";

export const outputServer = (): Output => ({
        path: _path.resolve(process.cwd(), "dist"),
        publicPath: "/",
        filename: "bundle.js"
});
