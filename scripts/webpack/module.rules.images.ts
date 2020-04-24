import { Rule } from "webpack";
import path from "path";

export const images = (): Rule => ({
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
});
