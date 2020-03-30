import { h, Fragment } from "../../../lib/h";

import { Container } from "../../components/container";
import { Section } from "../../components/section";

import { Hero } from "./section-hero";

// import { Info } from "./section-info";

export const AboutMain = () => (
        <Fragment>
                <Hero />
                {/*<Info />*/}
        </Fragment>
);

export const AboutTitle = () => <title>moki - about</title>;

export const AboutStyles = () => (
        <Fragment>
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/about/index.css"
                />
                <link rel="stylesheet" type="text/css" href="/global.css" />
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/vendors~global.css"
                />
        </Fragment>
);

export const AboutScripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                {/*<script defer src="/commons.js"></script>*/}
                <script defer src="/about/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
