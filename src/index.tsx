/* dev client entry */
import { render, renderStatic } from "../lib/render";
import { h } from "../lib/h";
import { routes } from "./routes";

/* global */
import "./global.tsx";

/* init components upon reloading */
import { load as loadGlobal, unload as unloadGlobal } from "./global";
import { load as loadMain, unload as unloadMain } from "./pages/index";
import { load as loadAbout, unload as unloadAbout } from "./pages/about/index";

/* pages */
require("./pages");
require("./pages/about");

const hooks: {
        [key: string]: { [key: string]: Function };
} = {
        "/": {
                load: loadMain,
                unload: unloadGlobal
        },
        "/about": {
                load: () => loadAbout,
                unload: () => unloadAbout
        }
};

const update = () => {
        const container = document.querySelector("#root");
        if (!container)
                throw new Error("Failed to render, provide #root Element");

        container.innerHTML = "";
        render(routes[window.location.pathname].main, container);

        // console.log(window.location.pathname);

        /* "destroy" */
        unloadGlobal();
        hooks[window.location.pathname].unload();

        /* init components upon reloading */
        loadGlobal();
        hooks[window.location.pathname].load();
};

if (module.hot) {
        module.hot.accept("./routes.tsx", () => {
                update();
        });
}

window.addEventListener("load", () => {
        update();
});
