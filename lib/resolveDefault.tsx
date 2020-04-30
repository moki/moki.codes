export function resolveDefault<T extends { default: any }>(mp: Promise<T>) {
        return mp.then(m => m.default);
}
