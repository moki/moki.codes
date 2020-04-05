import { h, Fragment } from "../../lib/h";
import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../components/card";

import { Hero } from "./section-hero";
import { Articles } from "./section-articles";
import { Code } from "./section-code";
import { Subscribe } from "./section-subscribe";

export const Main = () => (
        <Fragment>
                <Hero />
                <Articles />
                <Code />
                <Subscribe />
        </Fragment>
);

export const Title = () => (
        <Fragment>
                <title>moki — morozov kirill</title>
                <meta
                        name="description"
                        content="Hey my name is Kirill Morozov, i am software engineer who writes code and articles about it."
                />
        </Fragment>
);

export const Styles = () => (
        <Fragment>
                <link rel="stylesheet" type="text/css" href="/index.css" />
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
                <script defer src="/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
