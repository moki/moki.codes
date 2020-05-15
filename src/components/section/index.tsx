import { h } from "preact";

export type SectionProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function Section({ classes, children, ...rest }: SectionProps) {
        const _classes = `section${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}
