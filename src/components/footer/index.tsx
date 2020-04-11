import { h, Fragment } from "../../../lib/h";
import { Route } from "../../layout";

const Navitem = ({ styles, route }: { styles?: string; route: Route }) => (
        <div class="footer__navigation-itemsgroup" style={styles}>
                <a
                        href={route.url}
                        class="footer__navigation-item text_style_small-caps text_letter-spacing_m link"
                >
                        {route.name}
                </a>
                {route.nested
                        ? route.nested.map(e => (
                                  <a
                                          href={e.url}
                                          class="footer__navigation-subitem link"
                                  >
                                          {e.name}
                                  </a>
                          ))
                        : ""}
        </div>
);

const Nav = ({ routes }: { routes: Route[] }) => (
        <div class="footer__navigation">
                {routes.map((e, i) => {
                        return (
                                <Navitem
                                        route={e}
                                        styles={
                                                i === routes.length - 1
                                                        ? "margin-bottom: 0;"
                                                        : ""
                                        }
                                />
                        );
                })}
        </div>
);

export const Footer = ({
        routes,
        children
}: {
        routes: Route[];
        children?: any;
}) => {
        const brandClasses =
                "footer__navigation-itemsgroup footer__navigation-item footer__brand";
        const brandLinkClasses =
                "text_style_small-caps text_letter-spacing_m link";
        return (
                <div class="layout__footer footer elevation elevation_depth_8">
                        <div class="layout__container footer__container">
                                <div class={brandClasses}>
                                        <a class={brandLinkClasses} href="/">
                                                moki
                                        </a>
                                </div>
                                <Nav routes={routes} />
                        </div>
                </div>
        );
};
