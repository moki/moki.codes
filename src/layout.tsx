import { h, Fragment } from "../lib/h";

import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { Drawer } from "./components/drawer";

import { Map } from "../types/";

export const Layout = ({
        Title,
        Styles,
        Scripts,
        path,
        children
}: Map<any>) => {
        const bcs = [
                "theme",
                "theme_typography_default",
                "theme_breakpoint_default",
                "theme_msp_perfect-fifth",
                "theme_elevation_default",
                "theme_msc_major-third",
                "theme_gap_default",
                "layout",
                "layout_type_holy-grail-main",
                "layout_header_dense",
                "animation"
        ].join(" ");

        const routes = {
                about: "/about",
                articles: "/articles"
        };

        return (
                <html lang="en">
                        <head>
                                <meta charset="UTF-8" />
                                <meta
                                        name="viewport"
                                        content="width=device-width,
                                               initial-scale=1,
                                               maximum-scale=5,
                                               minimum-scale=1,
                                               minimal-ui,
                                               viewport-fit=cover"
                                />
                                <Title />
                                <Styles />
                        </head>
                        <body class={bcs} style="display: none;">
                                <Header routes={routes} path={path} />
                                <Drawer routes={routes} path={path} />
                                <Main>{children}</Main>
                                <Footer />
                                <Scripts />
                        </body>
                </html>
        );
};
