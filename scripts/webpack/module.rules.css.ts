import { Rule } from "webpack";
import { cssServer } from "./module.rules.css.server";
import { Map } from "../../types/index";

const rules: Map<Function> = {
        server: cssServer
};

export const css = (type: string): Rule => {
        if (!Object.prototype.hasOwnProperty.call(rules, type))
                throw new Error("no such css rule");

        return rules[type]();
};
