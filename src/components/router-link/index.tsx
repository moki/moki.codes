import { h } from "preact";
import { useLocation } from "wouter-preact";

export type RouterLinkProps = JSX.IntrinsicElements & {
        classes?: string;
        href: string;
        name: string;
};

export function RouterLink({ classes, href, name, ...rest }: RouterLinkProps) {
        const [location, setLocation] = useLocation();
        function handleClick(e: Event) {
                e.preventDefault();
                setLocation(href);
        }
        const _classes = "link" + `${classes ? " " + classes : ""}`;
        return (
                <a class={_classes} href={href} onClick={handleClick} {...rest}>
                        {name}
                </a>
        );
}
