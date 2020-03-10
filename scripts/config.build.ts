const assets = "dist";

export default {
        /* assets */
        entry: {
                sources: "src",
                pages: "pages",
                rgx: /index\.ts.*$/
        },
        optimization: {
                commons: {
                        ext: true,
                        name: "commons.js",
                        minChunks: 2
                },
                runtime: {
                        ext: true,
                        name: "runtime.js"
                }
        },
        output: {
                path: assets,
                public: "/"
        },

        /* templates */
        templates: {
                name: "index.html",
                sources: "pages",
                output: "build",
                rgx: /\.js.*$|\.css$/,
                assets
        }
};
