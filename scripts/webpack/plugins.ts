import { pluginsServer } from "./plugins.server";
import { pluginsBuild } from "./plugins.build";

import { Plugin } from "webpack";
import { Map } from "../../types/index";

const pluginsMap: Map<Function> = {
        server: pluginsServer,
        build: pluginsBuild
};

export const plugins = (type: string): Plugin[] => {
        if (!Object.prototype.hasOwnProperty.call(pluginsMap, type))
                throw new Error("no such plugin template");

        return pluginsMap[type]();
};
