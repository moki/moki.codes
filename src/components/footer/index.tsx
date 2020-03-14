import { h } from "../../../lib/h";

import "./styles.css";

export const Footer = ({ children, ...rest }: any) => {
        const classes = [
                "layout__footer",
                "footer",
                "elevation",
                "elevation_depth_8"
        ].join(" ");

        return (
                <footer class={classes}>
                        <div class="layout__container-fluid">moki</div>
                </footer>
        );
};
