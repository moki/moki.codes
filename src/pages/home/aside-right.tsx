import { h } from "preact";

export type ASideRightProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function ASideRight({ classes, children, ...rest }: ASideRightProps) {
        const _classes = `aside-right${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}
