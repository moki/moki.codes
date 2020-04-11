import { h, Fragment } from "../../../lib/h";
import { Map } from "../../../types/index";
import { Route } from "../../layout";

const NavigationItem = ({ path, route }: { path: string; route: Route }) => {
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
                        href={route.url}
                        class={cs(path, route.url)}
                        style="text-decoration: none;"
                >
                        {route.name}
                </a>
        );
};

const Navigation = ({ routes, path }: { routes: Route[]; path: string }) => {
        return (
                <ul class="list list_size_m" id="drawer-list">
                        {routes.map(e => (
                                <NavigationItem route={e} path={path} />
                        ))}
                </ul>
        );
};

export const Drawer = ({ routes, path }: { routes: Route[]; path: string }) => {
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
