import {
        HotModuleReplacementPlugin,
        NoEmitOnErrorsPlugin,
        Plugin
} from "webpack";

import { CleanWebpackPlugin } from "clean-webpack-plugin";

export const pluginsServer = (): Plugin[] => [
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin()
];
