require("@babel/register")({
        extensions: [".ts", ".tsx"],
        ignore: [/node_modules/]
});

const usage = () =>
        "Usage: \nNODE_ENV=<env> node scripts/index.js <script_name>";

let i = process.argv.length;
if (i !== 3) {
        console.error(usage());
        throw new Error("Invalid arguments");
}

const script = process.argv[--i];

const scripts = {
        server: () => require("./server.ts")
};

if (!Object.prototype.hasOwnProperty.call(scripts, script)) {
        console.error(usage());
        throw new Error("Invalid script name");
}

scripts[script]();
