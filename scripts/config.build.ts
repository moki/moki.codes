import path from "path";
const assets = "dist";

export default {
        api: "https://api.moki.codes",
        /* assets */
        entry: {
                sources: "src",
                pages: "pages",
                rgx: /index\.ts.*$/,
                vendor: {
                        "global.js": path.resolve(
                                process.cwd(),
                                "src",
                                "global.tsx"
                        )
                }
        },
        optimization: {
                commons: {
                        ext: false,
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
