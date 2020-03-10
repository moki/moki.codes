import { Map } from "../../types/index";

export const entryServer = (config: Map<string>): string[] => [
        /*
        "webpack-hot-middleware/client",
        "./src/index.tsx"
        */
        config.whm,
        config.main
];
