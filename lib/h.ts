import { isFunction } from "./utils";

export const h = (type: any, props: any, ...children: any[]): any => {
        let cn: any[] = [];
        for (const c in children)
                if (Array.isArray(children[c]))
                        cn = [...cn, ...children[c].flat()];
                else cn.push(children[c]);
        if (isFunction(type))
                return (type as Function)({ ...props, children: cn });
        return {
                type,
                props: {
                        ...props,
                        children: cn
                }
        };
};

export const Fragment = (props: any) => props.children;
