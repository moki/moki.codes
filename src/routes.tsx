import { h } from "../lib/h";
import { Map } from "../types/index";

import "./styles.css";

import "./pages/styles.css";
import {
        IndexMain,
        IndexTitle,
        IndexStyles,
        IndexScripts
} from "./pages/template";

import "./pages/about/styles.css";
import {
        AboutMain,
        AboutTitle,
        AboutStyles,
        AboutScripts
} from "./pages/about/template";

export const routes: Map<Map<Function | Element>> = {
        "/": {
                title: IndexTitle,
                styles: IndexStyles,
                scripts: IndexScripts,
                main: (<IndexMain />) as Function | Element
        },
        "/about": {
                title: AboutTitle,
                styles: AboutStyles,
                scripts: AboutScripts,
                main: (<AboutMain />) as Function | Element
        }
};
