import _path from "path";
import { Output } from "webpack";

export const outputServer = (): Output => ({
        path: _path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
});
