import terser from "terser-webpack-plugin";
import cssnano from "cssnano";
import optimizeCss from "optimize-css-assets-webpack-plugin";

import { Options } from "webpack";
import { Map } from "../../types/index";

const commons = (commons: Map<string>): any => ({
        commons: {
                name: commons.name,
                chunks: commons.chunks as any,
                minChunks: parseInt(commons.minChunks, 10)
        }
});

const runtime = (runtime: Map<string>): any => ({
        runtimeChunk: {
                name: runtime.name
        }
});

const minimizer = (): any[] => [
        new terser({}),
        new optimizeCss({
                cssProcessor: cssnano,
                cssProcessorPluginOptions: {
                        preset: [
                                "default",
                                {
                                        discardComments: {
                                                removeAll: true
                                        }
                                }
                        ]
                }
        })
];

export const optimizationBuild = (
        config: Map<Map<string>>
): Options.Optimization => ({
        splitChunks: {
                cacheGroups: {
                        vendors: {
                                test: /[\\/]node_modules[\\/]/i,
                                chunks: "all"
                        },
                        ...(config.commons.ext ? commons(config.commons) : {})
                }
        },
        ...(config.runtime.ext ? runtime(config.runtime) : {}),
        minimizer: minimizer()
});
