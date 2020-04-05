import { h } from "../lib/h";
import { Map } from "../types/index";

if (process.env.NODE_ENV === "production")
        require.extensions[".css"] = () => {};

export const router = (path: string) => {
        const route = `./pages${path === "/" ? "" : path}/template`;
        const module = require("" + route);

        return {
                title: module.Title,
                styles: module.Styles,
                scripts: module.Scripts,
                main: <module.Main />
        };
};
