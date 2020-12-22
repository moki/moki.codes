import { render, h } from "preact";
import { useLocation } from "wouter-preact";
import { Elevation } from "src/components/elevation";

export type Route = {
        name: string;
        url: string;
};

export type Props = {
        children?: JSX.Element[] | JSX.Element;
        classes?: string;
        primaryAction: JSX.Element;
        secondaryAction: JSX.Element;
        routes: Route[];
};

function Navi({ route: { name, url } }: { route: Route }) {
        const [location, setLocation] = useLocation();
        function changeLocation(e: Event) {
                e.preventDefault();
                setLocation(url);
        }
        const classes = `header__item header__navi${
                location === url ? " header__navi_active" : ""
        }`;
        return (
                <a href={url} class={classes} onClick={changeLocation}>
                        {name}
                </a>
        );
}

function Nav({ routes }: { routes: Route[] }) {
        return (
                <div class="header__nav">
                        {routes.map((route: Route) => (
                                <Navi route={route} />
                        ))}
                </div>
        );
}

export function Header({
        children,
        primaryAction,
        secondaryAction,
        routes,
        classes
}: Props) {
        const cs = ["header", classes].join(" ");
        return (
                <header class={cs}>
                        <Elevation depth={4} />
                        <div class="header__group header__group_l">
                                <div class="header__item header__icon header__primary">
                                        {primaryAction}
                                </div>
                                <Nav routes={routes} />
                        </div>
                        <div class="header__group header__group_r">
                                <div class="header__item header__icon header__secondary">
                                        {secondaryAction}
                                </div>
                        </div>
                </header>
        );
}
