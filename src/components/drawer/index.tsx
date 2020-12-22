import { h, Fragment } from "preact";
import { StateUpdater } from "preact/hooks";
import { handleClick } from "src/components/router-link";

import { useLocation } from "wouter-preact";

export type Route = {
        name: string;
        url: string;
};

export type DrawerProps = JSX.IntrinsicElements & {
        open: boolean;
        close: StateUpdater<boolean>;
        routes: Route[];
};

export function Drawer({ open, close, routes, ...rest }: DrawerProps) {
        const scrimStyles = open
                ? "opacity: .6;" + "z-index:25;"
                : "opacity: 0;" + "z-index: -1;";
        const drawerStyles = open
                ? "transform: translateX(0%);z-index:25;"
                : "transform: translateX(-100%);z-index: 25;";

        return (
                <Fragment>
                        <Scrim
                                id="drawer-scrim"
                                class="drawer-scrim"
                                style={scrimStyles}
                                onClick={() => close(false)}
                        />
                        <div class="drawer" {...rest} style={drawerStyles}>
                                <div class="elevation elevation_depth_16"></div>
                                <DrawerHeader close={close}>HOME</DrawerHeader>
                                <div class="drawer__body">
                                        <DrawerNav
                                                routes={routes}
                                                close={close}
                                        />
                                </div>
                        </div>
                </Fragment>
        );
}

export type DrawerHeaderProps = JSX.IntrinsicElements & {
        children: JSX.Element | JSX.Element[];
        close: StateUpdater<boolean>;
};

export function DrawerHeader({ children, close }: DrawerHeaderProps) {
        const [location, setLocation] = useLocation();

        const mixin = {
                onClick: (e: Event) => {
                        setLocation("/");
                        close(false);
                },
        };
        return (
                <div class="drawer__header" {...mixin}>
                        <div class="elevation elevation_depth_1"></div>
                        <div class="drawer__header-text">{children}</div>
                </div>
        );
}

export type DrawerNavProps = JSX.IntrinsicElements & {
        routes: Route[];
        close: StateUpdater<boolean>;
};

export function DrawerNav({ routes, close }: DrawerNavProps) {
        const [home, ..._routes] = routes;
        return (
                <ul>
                        {_routes.map((e) => (
                                <DrawerNavi close={close} {...e} />
                        ))}
                </ul>
        );
}

export type DrawerNaviProps = JSX.IntrinsicElements & {
        close: StateUpdater<boolean>;
        name: string;
        url: string;
};

export function DrawerNavi({ close, name, url }: DrawerNaviProps) {
        const [location, setLocation] = useLocation();
        const clickHandler = (e: Event) => {
                e.preventDefault();
                setLocation(url);
                close(false);
        };

        return (
                <li class="drawer__navi" onClick={clickHandler}>
                        {name}
                </li>
        );
}

export type ScrimProps = JSX.IntrinsicElements & {
        id: string;
};

export function Scrim({ id, ...rest }: ScrimProps) {
        return <div class="scrim" id={id} {...rest}></div>;
}
