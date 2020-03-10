import path from "path";
import { promises as fs, constants } from "fs";

const { R_OK, W_OK } = constants;

import { Map } from "../../types/index";

export const entryBuild = async (config: Map<string>): Promise<Map<string>> => {
        const { sources, pages } = config;
        const rgx: RegExp = (config.rgx as unknown) as RegExp;

        let pcursor = path.resolve(process.cwd(), sources, pages);

        const directories: string[] = [];
        const entries: string[] = [];

        directories.push(pcursor);

        for (; directories.length; ) {
                pcursor = directories.pop()!;
                const directory = await fs.opendir(pcursor);
                for await (const entry of directory) {
                        if (entry.isDirectory())
                                directories.push(
                                        path.resolve(pcursor, entry.name)
                                );
                        else if (rgx.test(entry.name))
                                entries.push(path.resolve(pcursor, entry.name));
                }
        }

        const entriesKeys = entries.map(entry =>
                entry
                        .slice(entry.indexOf(pages))
                        .replace(/\.tsx/, ".js")
                        .replace(/\.ts/, ".js")
        );

        const entry = entriesKeys.reduce(
                (o, k, i) => ({ ...o, [k]: entries[i] }),
                {}
        );

        console.log(entry);

        return entry;
};
