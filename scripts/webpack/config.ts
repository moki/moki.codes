import { Configuration } from "webpack";

import { ServerConfiguration } from "./config.server";

import { Map } from "../../types/index";

const configurations: Map<Function> = {
        server: ServerConfiguration
};

const log = (a: any) => {
        if (process.env._DEBUG) console.log(JSON.stringify(a, null, "\t"));
        return a;
};

export const ConfigurationFactory = async (
        type: string
): Promise<Configuration> => {
        if (!Object.prototype.hasOwnProperty.call(configurations, type))
                throw new Error("no such webpack configuration");

        return log(await configurations[type]());
};
