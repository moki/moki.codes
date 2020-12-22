import { h } from "preact";

export function Paragraph({ children, classes }: JSX.IntrinsicElements) {
        return (
                <p class={`article__paragraph${classes ? " " + classes : ""}`}>
                        {children}
                </p>
        );
}
