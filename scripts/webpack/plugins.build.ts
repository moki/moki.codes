import { CleanWebpackPlugin } from "clean-webpack-plugin";
import minicssext from "mini-css-extract-plugin";

import { Plugin } from "webpack";

export const pluginsBuild = (): Plugin[] => [
        new CleanWebpackPlugin(),
        new minicssext()
];
