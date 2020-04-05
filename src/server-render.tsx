if (process.env.NODE_ENV === "production")
        require.extensions[".css"] = () => {};

import { h } from "../lib/h";
import { renderStatic } from "../lib/render";

import { Layout } from "./layout";
import { router } from "./routes";

const is_dev = process.env.NODE_ENV === "development";

const dev_scripts = () => <script defer src="/bundle.js"></script>;
const dev_styles = () => "";

export const render = (path: string, cb: Function) => {
        const { title, styles, scripts, main } = router(path);

        const html = (
                <Layout
                        path={path}
                        Title={title}
                        Styles={is_dev ? dev_styles : styles}
                        Scripts={is_dev ? dev_scripts : scripts}
                >
                        {main}
                </Layout>
        );

        cb(null, renderStatic(html), path);
};
