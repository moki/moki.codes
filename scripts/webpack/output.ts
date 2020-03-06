import { Output } from "webpack";
import { outputServer } from "./output.server";
import { Map } from "../../types/index";

const outputs: Map<Function> = {
        server: outputServer
};

export const output = (type: string): Output => {
        if (!Object.prototype.hasOwnProperty.call(outputs, type))
                throw new Error("no such css rule");

        return outputs[type]();
};
