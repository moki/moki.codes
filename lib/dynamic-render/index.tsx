import { h } from "preact";

export type Template = {
        name: string;
        component: preact.ComponentType;
};

export type Templates = Template[];

export class DynamicRenderer {
        private nameToComponent = new Map<string, preact.ComponentType>();

        constructor(templates?: Templates) {
                if (!templates) templates = [];

                templates.forEach(({ name, component }: Template) => {
                        this.nameToComponent.set(name, component);
                });
        }

        addTemplate({ name, component }: Template) {
                this.nameToComponent.set(name, component);
        }

        removeTemplate({ name, component }: Template) {
                this.nameToComponent.delete(name);
        }

        render(data: preact.VNode<any>) {
                const component = this.nameToComponent.get(data.type as string);
                if (!component) return "";

                return h<any>(component, {
                        ...data.props,
                        children: Array.isArray(data.props.children)
                                ? data.props.children.map(
                                          (child: preact.VNode<any>) =>
                                                  child.type
                                                          ? this.render(child)
                                                          : child
                                  )
                                : data.props.children,
                });
        }
}
