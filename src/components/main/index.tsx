import { h } from "preact";

export type MainProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function Main({ classes, children, ...rest }: MainProps) {
        const _classes = "layout_hg__main" + `${classes ? " " + classes : ""}`;
        return (
                <main class={_classes} {...rest}>
                        {children}
                </main>
        );
}
