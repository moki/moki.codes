import { Rule } from "webpack";

export const ts = (): Rule => ({
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader"
});
