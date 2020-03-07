import { h } from "../lib/h";
import { Map } from "../types/index";

import "./pages/styles.css";

import {
        IndexMain,
        IndexTitle,
        IndexStyles,
        IndexScripts
} from "./pages/template";

export const routes: Map<Map<Function | Element>> = {
        "/": {
                title: IndexTitle,
                styles: IndexStyles,
                scripts: IndexScripts,
                main: (<IndexMain />) as Function | Element
        }
};
