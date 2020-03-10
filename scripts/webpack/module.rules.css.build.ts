import minicssext from "mini-css-extract-plugin";
import { Rule } from "webpack";

export const cssBuild = (): Rule => ({
        test: /\.css$/,
        use: [minicssext.loader, "css-loader"]
});
