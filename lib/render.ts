const createElementFn = (type: any) => {
        const svgs = ["svg", "path", "circle", "rect", "g"];
        return svgs.includes(type)
                ? document.createElementNS("http://www.w3.org/2000/svg", type)
                : document.createElement(type);
};

/*
export const render = (vn: any, dn: Element) => {
        if (!vn) return;

        const nodes: any[] = [];
        const parents: Element[] = [];

        nodes.push(vn);
        parents.push(dn);

        let node: any;
        let parent: Element;
        let i;

        for (; nodes.length; ) {
                vn = nodes.pop()!;
                parent = parents.pop()!;

                if (Array.isArray(vn)) {
                        i = vn.length;
                        for (; i--; ) {
                                nodes.push(vn[i]);
                                parents.push(parent);
                        }
                        continue;
                }
                const nonTextNode = vn && vn.props && vn.props.children;
                node = nonTextNode
                        ? 
                          createElementFn(vn.type!)
                        : document.createTextNode(vn);

                for (const p in vn.props)
                        if (p !== "children") node.setAttribute(p, vn.props[p]);

                parent.appendChild(node);
                parent = node;

                if (!nonTextNode) continue;

                i = vn.props.children.length;
                for (; i--; ) {
                        parents.push(parent);
                        nodes.push(vn.props.children[i]);
                }
        }

        let e: CustomEvent;
        if (typeof CustomEvent === "function") {
                e = new CustomEvent(VIRTUAL_DOM_RENDER_FINISH, {
                        bubbles: false,
                        detail: {}
                });
        } else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(VIRTUAL_DOM_RENDER_FINISH, false, false, {});
        }

        window.dispatchEvent(e);
};
*/

const createElement = (tag: any, props: any) => {
        return `<${tag}${props &&
                Object.keys(props)
                        .filter(p => p !== "children")
                        .map(p => ` ${p}="${props[p]}"`)
                        .filter(Boolean)
                        .join("")}>${props &&
                props.children
                        .map((c: any) =>
                                typeof c === "object" && c != null
                                        ? createElement(c.type, c.props)
                                        : c + ""
                        )
                        .filter(Boolean)
                        .join("")}</${tag}>`;
};

export const renderStatic = (vn: any) => {
        let r = "";
        if (!Array.isArray(vn)) return createElement(vn.type, vn.props);
        let i;
        for (i = 0; i < vn.length; i++)
                r += createElement(vn[i].type, vn[i].props);
        return r;
};

export const render = (vn: any, dn: Element) => {
        const r = renderStatic(vn);
        dn.innerHTML = r;
        let e: CustomEvent;
        if (typeof CustomEvent === "function") {
                e = new CustomEvent(VIRTUAL_DOM_RENDER_FINISH, {
                        bubbles: false,
                        detail: {}
                });
        } else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(VIRTUAL_DOM_RENDER_FINISH, false, false, {});
        }

        window.dispatchEvent(e);
};

export const VIRTUAL_DOM_RENDER_FINISH = "moki.codes:vdom-render-finish";
