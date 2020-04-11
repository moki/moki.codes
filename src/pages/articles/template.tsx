import { h, Fragment } from "../../../lib/h";

import { Hero } from "./section-hero";
import { Articles } from "./section-articles";

export const Main = () => {
        return (
                <Fragment>
                        <Hero />
                        <Articles />
                </Fragment>
        );
};

export const Title = () => <title>moki — articles</title>;

export const Styles = () => (
        <Fragment>
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/articles/index.css"
                />
                <link rel="stylesheet" type="text/css" href="/global.css" />
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/vendors~global.css"
                />
        </Fragment>
);

export const Scripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                {/*<script defer src="/commons.js"></script>*/}
                <script defer src="/articles/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
