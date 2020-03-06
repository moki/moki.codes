import { Rule } from "webpack";

export const cssServer = (): Rule => ({
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
});
