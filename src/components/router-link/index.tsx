import { h } from "preact";
import { useLocation } from "wouter-preact";

export function handleClick(href: string) {
        const [location, setLocation] = useLocation();
        return (e: Event) => {
                e.preventDefault();
                setLocation(href);
        };
}

export type RouterLinkProps = JSX.IntrinsicElements & {
        classes?: string;
        href: string;
        name: string;
};

export function RouterLink({ classes, href, name, ...rest }: RouterLinkProps) {
        const _classes = "link" + `${classes ? " " + classes : ""}`;
        return (
                <a
                        class={_classes}
                        href={href}
                        onClick={handleClick(href)}
                        {...rest}
                >
                        {name}
                </a>
        );
}
