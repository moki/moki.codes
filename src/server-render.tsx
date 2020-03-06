import { h } from "../lib/h";
import { renderStatic } from "../lib/render";

import { Layout, FComponent } from "./layout";

// import { routes } from "./routes";

export const render = (path: string, cb: Function) => {
        const html = (
                <Layout>
                        <FComponent name="Kirill" likes={321} />
                </Layout>
        );

        cb(null, renderStatic(html), path);
};
