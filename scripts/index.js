require("@babel/register")({
        extensions: [".ts", ".tsx", ".js"],
        ignore: [/node_modules/]
});

const usage = () =>
        "Usage: \nNODE_ENV=<env> node scripts/index.js <script_name>";

let i = process.argv.length;
if (i < 3) {
        console.error(usage());
        throw new Error("Invalid arguments");
}

const script = process.argv[2];

const scripts = {
        server: () => require("./server.ts"),
        build: () => require("./build.ts"),
        new: () => require("./new.ts")
};

if (!Object.prototype.hasOwnProperty.call(scripts, script)) {
        console.error(usage());
        throw new Error("Invalid script name");
}

if (script === "new" && process.argv.length < 4) {
        console.error(usage());
        throw new Error("Invalid arguments");
}

scripts[script]();
