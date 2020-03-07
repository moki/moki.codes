import { Rule } from "webpack";

export const ts = (): Rule => ({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
});
