const scripts: { [key: string]: Function } = {
        article: () => require("./new.article.ts")
};

const script = process.argv[3];

if (!Object.prototype.hasOwnProperty.call(scripts, script)) {
        throw new Error("No such template for the new script exists.");
}

scripts[script]();
