import { render, renderStatic } from "../lib/render";
import { h } from "../lib/h";
import { routes } from "./routes";

if (module.hot) {
        module.hot.accept("./routes.tsx", () => {
                update();
        });
}

const update = () => {
        const container = document.querySelector("#root");
        if (!container)
                throw new Error("Failed to render, provide #root Element");

        container.innerHTML = "";
        render(routes[window.location.pathname].main, container);
};

window.addEventListener("load", () => {
        update();
});

console.log("hello");
