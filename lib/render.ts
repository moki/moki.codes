const createElementFn = (type: any) => {
        const svgs = ["svg", "path", "circle", "rect", "g"];
        return svgs.includes(type)
                ? document.createElementNS("http://www.w3.org/2000/svg", type)
                : document.createElement(type);
};

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
                        ? /*document.createElement(vn.type!)*/
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
};

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

export const renderStatic = (vn: any) => createElement(vn.type, vn.props);
