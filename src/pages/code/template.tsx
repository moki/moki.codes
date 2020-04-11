import { h, Fragment } from "../../../lib/h";

import { Hero } from "./section-hero";

export const Main = () => (
        <Fragment>
                <Hero />
        </Fragment>
);

export const Title = () => <title>moki — code</title>;

export const Styles = () => (
        <Fragment>
                <link rel="stylesheet" type="text/css" href="/code/index.css" />
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
                <script defer src="/code/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
