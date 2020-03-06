export const render = (path: string, cb: Function) => {
        cb(
                null,
                `<html><div style="color: purple">Hello world: ${path}</div><script defer src="/bundle.js"></script></html>`
        );
};
