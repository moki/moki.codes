import { outputServer } from "./output.server";
import { outputBuild } from "./output.build";

import { Output } from "webpack";
import { Map } from "../../types/index";

const outputs: Map<Function> = {
        server: outputServer,
        build: outputBuild
};

export const output = (type: string, config: Map<string>): Output => {
        if (!Object.prototype.hasOwnProperty.call(outputs, type))
                throw new Error("no such output template");

        return outputs[type](config);
};
