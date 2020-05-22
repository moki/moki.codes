import { render, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { useLocation } from "wouter-preact";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { Header } from "src/components/header";
import { Drawer } from "src/components/drawer";
import { Main } from "src/components/main";
import { Footer } from "src/components/footer";
import { Snackbar } from "src/components/snackbar";

import { Theme } from "src/components/theme";

import { Sun, Moon, Menu } from "src/components/icons";

import { Home } from "src/pages/home";
import { Articles } from "src/pages/articles";
import { Code } from "src/pages/code";
import { About } from "src/pages/about";

const routes = [
        { name: "home", url: "/" },
        { name: "about", url: "/about" },
        { name: "articles", url: "/articles" },
        { name: "code", url: "/code" }
];

const pages: { [key: string]: () => preact.JSX.Element } = {
        home: Home,
        about: About,
        articles: Articles,
        code: Code,
        notfound: () => <div>not found</div>
};

function Router({ location }: { location: string }) {
        const route = routes.filter(e => e.url === location);
        if (route.length) return pages[route[0].name];
        else return pages["notfound"];
}

function App() {
        const theme = Theme();
        const [location, setLocation] = useLocation();
        const [drawer, setDrawer] = useState(false);
        const classes = [...theme.classes, "layout", "layout_hg"].join(" ");

        const primaryAction = <Menu onClick={() => setDrawer(!drawer)} />;
        const secondaryAction = theme.color ? (
                <Sun onClick={theme.toggleColor} />
        ) : (
                <Moon onClick={theme.toggleColor} />
        );

        const Route = Router({ location });

        return (
                <div class={classes} style="grid-template-rows: 56px 1fr auto;">
                        <Snackbar>
                                <Header
                                        classes="layout_hg__header header_fixed"
                                        primaryAction={primaryAction}
                                        secondaryAction={secondaryAction}
                                        routes={routes}
                                ></Header>
                                <Drawer
                                        open={drawer}
                                        close={setDrawer}
                                        routes={routes}
                                />
                                <Route />
                                <Footer
                                        classes="layout_hg__footer"
                                        routes={routes}
                                >
                                        <div>footer</div>
                                </Footer>
                        </Snackbar>
                </div>
        );
}

Promise.all(
        [
                import("lib/reset.css"),
                import("src/components/theme/styles.css"),
                import("src/components/elevation/styles.css"),
                import("src/components/layout/styles.css"),
                import("src/components/grid/styles.css"),
                import("src/components/header/styles.css"),
                import("src/components/footer/styles.css"),
                import("src/components/drawer/styles.css"),
                import("src/components/snackbar/styles.css"),
                import("src/styles.css")
        ].map(resolveDefault)
).then(insertStyles);

render(<App />, document.body);
