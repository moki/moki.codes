import { h, Fragment } from "../../../lib/h";
import { Map } from "../../../types/index";

const NavigationItem = ({
        path,
        route,
        routeName
}: {
        path: string;
        route: string;
        routeName: string;
}) => {
        const bcs = [
                "list__item",
                "text_line-height_m",
                "text_size_s",
                "text_weight_medium",
                "text_style_small-caps",
                "text_letter-spacing_m"
        ];
        const acs = ["list__item_active"];
        const cs = (path: string, route: string) =>
                [...bcs, ...(path === route ? acs : [])].join(" ");

        return (
                <a
                        href={route}
                        class={cs(path, route)}
                        style="text-decoration: none;"
                >
                        {routeName}
                </a>
        );
};

const Navigation = ({
        routes,
        path,
        ...rest
}: {
        routes: Map<string>;
        path: string;
}) => {
        const items = [];

        for (const route in routes) {
                items.push(
                        NavigationItem({
                                path,
                                route: routes[route],
                                routeName: route
                        })
                );
        }

        return (
                <ul class="list list_size_m" id="drawer-list">
                        {items}
                </ul>
        );
};

export const Drawer = ({
        routes,
        path,
        ...rest
}: {
        routes: Map<string>;
        path: string;
}) => {
        return (
                <Fragment>
                        <div class="drawer-scrim" id="drawer-scrim"></div>
                        <aside class="layout__aside-left elevation elevation_depth_0 drawer">
                                <a
                                        href="/"
                                        class="drawer__header
                                               text_line-height_m
                                               text_size_s
                                               text_weight_medium
                                               text_style_small-caps
                                               text_letter-spacing_m
                                               text_align_center
                                               "
                                        style="text-decoration: none;"
                                >
                                        moki
                                </a>
                                <Navigation routes={routes} path={path} />
                        </aside>
                </Fragment>
        );
};
