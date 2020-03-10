import { Configuration } from "webpack";

import { ServerConfiguration } from "./config.server";
import { BuildConfiguration } from "./config.build";

import { Map } from "../../types/index";

const configurations: Map<Function> = {
        server: ServerConfiguration,
        build: BuildConfiguration
};

const log = (a: any) => {
        if (process.env._DEBUG) console.log(JSON.stringify(a, null, "\t"));
        return a;
};

export const ConfigurationFactory = async (
        type: string,
        config: Map<any>
): Promise<Configuration> => {
        if (!Object.prototype.hasOwnProperty.call(configurations, type))
                throw new Error("no such webpack configuration template");

        return log(await configurations[type](config));
};
