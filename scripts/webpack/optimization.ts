import { optimizationBuild } from "./optimization.build";

import { Options } from "webpack";
import { Map } from "../../types/index";

const entries: Map<Function> = {
        build: optimizationBuild
};

export const optimization = (
        type: string,
        config: Map<string>
): Options.Optimization => {
        if (!Object.prototype.hasOwnProperty.call(entries, type))
                throw new Error("no such optimization template");

        return entries[type](config);
};
