import { entryServer } from "./entry.server";
import { Map } from "../../types/index";

const entries: Map<Function> = {
        server: entryServer.bind(null, "./src/index.ts")
};

export const entry = (type: string): string[] => {
        if (!Object.prototype.hasOwnProperty.call(entries, type))
                throw new Error("no such css rule");

        return entries[type]();
};
