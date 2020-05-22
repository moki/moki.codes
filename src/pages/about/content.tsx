import { h } from "preact";

export type ContentProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function Content({ classes, children, ...rest }: ContentProps) {
        const _classes = `content${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}
