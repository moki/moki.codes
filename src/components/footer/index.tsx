import { render, h } from "preact";
import { Elevation } from "src/components/elevation";
import { RouterLink } from "src/components/router-link";

export type Route = {
        name: string;
        url: string;
};

export type Props = {
        children?: JSX.Element[] | JSX.Element;
        classes?: string;
        routes: Route[];
};

function Navi({ route: { name, url } }: { route: Route }) {
        return <RouterLink href={url} name={name} classes="footer__navi" />;
}

function Nav({ routes }: { routes: Route[] }) {
        return (
                <div class="footer__nav">
                        {routes.map((route: Route) => (
                                <Navi route={route} />
                        ))}
                </div>
        );
}

export function Footer({ routes, classes }: Props) {
        const _classes = "footer" + `${classes ? " " + classes : ""}`;
        return (
                <footer class={_classes}>
                        <Elevation depth={8} />
                        <div class="footer__brand">MOKI</div>
                        <Nav routes={routes} />
                        <div class="footer__copy">
                                {new Date().getFullYear()} kirill morozov
                        </div>
                </footer>
        );
}
