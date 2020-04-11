import { h } from "../../../lib/h";
import { Map } from "../../../types/index";
import { Route } from "../../layout";

import { ContainerFluid } from "../container-fluid";

const Hamburger = () => (
        <svg
                class="header__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
        >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
);
const ToggleDark = () => (
        <svg
                class="header__icon theme__toggle theme__toggle_dark"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
        >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M10 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07C10.9 17.77 12 14.95 12 12s-1.1-5.77-3.01-7.93C9.32 4.02 9.66 4 10 4m0-2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />
        </svg>
);
const ToggleLight = () => (
        <svg
                class="header__icon theme__toggle theme__toggle_light theme__toggle_hide"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
        >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
        </svg>
);

const Brand = () => (
        <a
                href="/"
                class="header__action
                       header__brand
                       text_size_s
                       text_weight_medium
                       text_line-height_m
                       text_style_small-caps
                       text_letter-spacing_m
                       text_align_center
                       "
                style="text-decoration: none;"
        >
                moki
        </a>
);

const NavigationItem = ({ route, path }: { route: Route; path: string }) => {
        const bcs = [
                "header__action",
                "header__navigation-item",
                "text_line-height_m",
                "text_size_s",
                "text_weight_medium",
                "text_style_small-caps",
                "text_letter-spacing_m"
        ];
        const acs = ["link_active"];
        const cs = (path: string, route: string) =>
                [...bcs, ...(path === route ? acs : [])].join(" ");
        return (
                <a href={route.url} class={cs(path, route.url)}>
                        {route.name}
                </a>
        );
};

const Navigation = ({ routes, path }: { routes: Route[]; path: string }) => {
        return (
                <div class="header__navigation">
                        {routes.map(e => (
                                <NavigationItem route={e} path={path} />
                        ))}
                </div>
        );
};

export const Header = ({ routes, path }: { routes: Route[]; path: string }) => {
        return (
                <header
                        class="layout__header
                                header
                                header_fixed
                                elevation
                                elevation_depth_4"
                >
                        <ContainerFluid classes="header__container">
                                <div class="header__action header__action_primary">
                                        <Hamburger />
                                </div>
                                <Brand />
                                <Navigation routes={routes} path={path} />
                                <div class="header__action header__action_secondary">
                                        <ToggleDark />
                                        <ToggleLight />
                                </div>
                        </ContainerFluid>
                </header>
        );
};
