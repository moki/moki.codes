module.exports = {
        settings: {
                pragma: "h",
                pragmaFrag: "f"
        },
        parser: "@typescript-eslint/parser",
        parserOptions: {
                ecmaFeatures: {
                        jsx: true
                }
        },
        extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
                "prettier",
                "prettier/babel",
        ],
        plugins: ["babel", "react", "@typescript-eslint"],
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
