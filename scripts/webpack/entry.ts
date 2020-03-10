import { entryServer } from "./entry.server";
import { entryBuild } from "./entry.build";

import { Map } from "../../types/index";

const entries: Map<Function> = {
        server: entryServer,
        build: entryBuild
};

export const entry = (
        type: string,
        config: Map<string>
): string[] | Map<string> => {
        if (!Object.prototype.hasOwnProperty.call(entries, type))
                throw new Error("no such entry template");

        return entries[type](config);
};
