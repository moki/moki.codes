/* dev client entry */
import { render, renderStatic } from "../lib/render";
import { h } from "../lib/h";
import { routes } from "./routes";

/* global */
import "./global.tsx";

/* init components upon reloading */
import { load as loadGlobal, unload as unloadGlobal } from "./global";
import { load as loadMain, unload as unloadMain } from "./pages/index";

/* pages */
require("./pages");
require("./pages/about");

const update = () => {
        const container = document.querySelector("#root");
        if (!container)
                throw new Error("Failed to render, provide #root Element");

        container.innerHTML = "";
        render(routes[window.location.pathname].main, container);

        /* "destroy" */
        unloadGlobal();
        unloadMain();

        /* init components upon reloading */
        loadGlobal();
        loadMain();
};

if (module.hot) {
        module.hot.accept("./routes.tsx", () => {
                update();
        });
}

window.addEventListener("load", () => {
        update();
});
