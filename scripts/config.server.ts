export default {
        port: 3000,
        entry: {
                whm: "webpack-hot-middleware/client",
                main: "./src/index.tsx"
        },
        output: {
                path: "dist",
                public: "/",
                name: "bundle.js"
        }
};
