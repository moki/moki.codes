import { h, Fragment } from "../../../lib/h";
import { Route } from "../../layout";

export const Footer = ({
        routes,
        children
}: {
        routes: Route[];
        children?: any;
}) => {
        const brandLinkClasses =
                "text_style_small-caps text_letter-spacing_m link footer__brand";

        const navitemClasses =
                "text_style_small-caps text_letter-spacing_m link footer__navitem";

        return (
                <div class="layout__footer footer elevation elevation_depth_8">
                        <div class="layout__container footer__container">
                                <a class={brandLinkClasses}>moki</a>
                                <div class="footer__nav">
                                        {routes.map((e: any) => (
                                                <a
                                                        href={e.url}
                                                        class={navitemClasses}
                                                >
                                                        {e.name}
                                                </a>
                                        ))}
                                </div>
                        </div>
                </div>
        );
};
