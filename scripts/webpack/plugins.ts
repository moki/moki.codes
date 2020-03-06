import { Plugin } from "webpack";
import { pluginsServer } from "./plugins.server";
import { Map } from "../../types/index";

const pluginsMap: Map<Function> = {
        server: pluginsServer
};

export const plugins = (type: string): Plugin[] => {
        if (!Object.prototype.hasOwnProperty.call(pluginsMap, type))
                throw new Error("no such css rule");

        return pluginsMap[type]();
};
