import { h } from "../lib/h";
import { renderStatic } from "../lib/render";

import { Layout } from "./layout";
import { routes } from "./routes";

const is_dev = process.env.NODE_ENV === "development";

const dev_scripts = () => <script defer src="/bundle.js"></script>;
const dev_styles = () => "";

export const render = (path: string, cb: Function) => {
        const html = (
                <Layout
                        Title={routes[path].title}
                        Styles={is_dev ? dev_styles : routes[path].styles}
                        Scripts={is_dev ? dev_scripts : routes[path].scripts}
                >
                        {routes[path].main}
                </Layout>
        );

        cb(null, renderStatic(html), path);
};
