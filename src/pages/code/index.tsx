import "../../components/section/styles.css";

import "./section-hero.css";

export const load = () => {};
export const unload = () => {};

if (process.env.NODE_ENV === "development") {
        if (window.location.pathname === "/code") {
                window.addEventListener("load", load);
                window.addEventListener("unload", unload);
        }
} else {
        window.addEventListener("load", load);
        window.addEventListener("unload", unload);
}
