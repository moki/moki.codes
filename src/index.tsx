/* dev client entry */
import { render, renderStatic } from "../lib/render";
import { h } from "../lib/h";
import { router } from "./routes";

const getDependencies = (path: string) => {
        const root = "./";
        let dependencies = ["./global.tsx"];
        const dependency = `./pages${path === "/" ? "" : path}/index`;
        dependencies.push(dependency);
        return dependencies.map(e => require("" + e));
};

const load = () => {
        const container = document.querySelector("#root");
        if (!container)
                throw new Error("Failed to render, provide #root Element");
        const path = window.location.pathname;
        container.innerHTML = "";
        render(router(path).main, container);
        const dependencies = getDependencies(path);
        dependencies.forEach(e => e.load());
};

const unload = () => {
        const container = document.querySelector("#root");
        if (!container)
                throw new Error("Failed to render, provide #root Element");
        const path = window.location.pathname;
        const dependencies = getDependencies(path);
        dependencies.forEach(e => e.unload());
        container.innerHTML = "";
};

if (module.hot) {
        load();
        module.hot.accept(() => {});
        module.hot.dispose(data => {
                unload();
        });
}

window.addEventListener("load", load);
