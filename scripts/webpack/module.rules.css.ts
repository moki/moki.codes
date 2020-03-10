import { cssServer } from "./module.rules.css.server";
import { cssBuild } from "./module.rules.css.build";

import { Rule } from "webpack";
import { Map } from "../../types/index";

const rules: Map<Function> = {
        server: cssServer,
        build: cssBuild
};

export const css = (type: string): Rule => {
        if (!Object.prototype.hasOwnProperty.call(rules, type))
                throw new Error("no such css rule template");

        return rules[type]();
};
