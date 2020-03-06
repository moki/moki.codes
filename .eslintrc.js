module.exports = {
        settings: {
                pragma: "h",
                pragmaFrag: "f"
        },
        parser: "babel-eslint",
        parserOptions: {
                ecmaFeatures: {
                        jsx: true
                }
        },
        extends: ["eslint:recommended", "prettier", "prettier/babel"],
        plugins: ["babel", "react"],
        env: {
                es2020: true,
                browser: true,
                node: true
        },
        rules: {
                "react/jsx-uses-react": "error",
                "no-unused-vars": ["error", { varsIgnorePattern: "^h$" }]
        }
};
