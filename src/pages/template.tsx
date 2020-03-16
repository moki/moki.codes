import { h, Fragment } from "../../lib/h";
import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../components/card";

const HeroMedia = () => {
        return (
                <img
                        class="hero__media elevation elevation_depth_1"
                        src="https://i.imgur.com/A6hNrWQ.jpg"
                        alt="kirill morozov headshot"
                />
        );
};

const ContactAction = () => (
        <a href="/about#contact">
                <button
                        class="button button_type_raised button_color_primary-light button_size_m
       text text_style_small-caps text_align_center text_size_s text_weight_regular"
                >
                        <span class="elevation elevation_depth_2 button__elevation"></span>
                        contact me
                </button>
        </a>
);

const LearnMoreAction = () => (
        <a href="/about">
                <button
                        class="button button_type_ghost button_color_primary-light button_size_m
       text text_style_small-caps text_align_center text_size_s text_weight_regular"
                >
                        <span class="elevation elevation_depth_2 button__elevation"></span>
                        learn more
                </button>
        </a>
);

const Description = () => (
        <p class="text text_size_m text_weight_regular legend">
                I am software engineer who writes{" "}
                <a
                        href="/code"
                        class="link link_inline text text_size_l text_style_small-caps text_weight_medium"
                >
                        code
                </a>{" "}
                and{" "}
                <a
                        href="/articles"
                        class="link link_inline text text_size_l text_style_small-caps text_weight_medium"
                >
                        articles
                </a>{" "}
                about it.
        </p>
);

const HeroText = () => {
        return (
                <div class="hero__text">
                        <Card>
                                <CardText>
                                        <CardHeader>
                                                <h4 class="text text_size_l text_weight_light">
                                                        Hey, my name is
                                                </h4>
                                                <h1 class="text text_size_2xl text_weight_light title">
                                                        Kirill Morozov
                                                </h1>
                                        </CardHeader>
                                        <CardBody>
                                                <Description />
                                        </CardBody>
                                        <CardFooter>
                                                <ContactAction />
                                                <LearnMoreAction />
                                        </CardFooter>
                                </CardText>
                        </Card>
                </div>
        );
};

export const IndexMain = () => (
        <Fragment>
                <div class="section">
                        <div class="layout__container hero">
                                <HeroMedia />
                                <HeroText />
                        </div>
                </div>
        </Fragment>
);

export const IndexTitle = () => (
        <Fragment>
                <title>moki - morozov kirill</title>
                <meta
                        name="description"
                        content="Kirill Morozov is software engineer who writes code and articles about it."
                />
        </Fragment>
);

export const IndexStyles = () => (
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

export const IndexScripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                <script defer src="/commons.js"></script>
                <script defer src="/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
