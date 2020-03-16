import { h, Fragment } from "../../lib/h";

export const IndexMain = () => (
        <Fragment>
                <div class="section">
                        <div class="layout__container main">
                                <img
                                        class="face elevation elevation_depth_1"
                                        src="https://i.imgur.com/A6hNrWQ.jpg"
                                        alt="kirill morozov headshot"
                                />
                                <div class="description">
                                        <div class="content card">
                                                <div class="elevation elevation_depth_1 card__elevation"></div>
                                                <div class="card__text">
                                                        <div class="card__header">
                                                                <h4 class="text text_size_l text_weight_light">
                                                                        Hey, my
                                                                        name is
                                                                </h4>
                                                                <h1 class="text text_size_2xl text_weight_light title">
                                                                        Kirill
                                                                        Morozov
                                                                </h1>
                                                        </div>
                                                        <div class="card__body">
                                                                <p class="text text_size_m text_weight_regular legend">
                                                                        I am
                                                                        software
                                                                        engineer
                                                                        who
                                                                        writes{" "}
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
                                                                        about
                                                                        it.
                                                                </p>
                                                        </div>
                                                        <div class="card__footer">
                                                                <a href="/about#contact">
                                                                        <button
                                                                                class="button button_type_raised button_color_primary-light button_size_m
               text text_style_small-caps text_align_center text_size_s text_weight_regular"
                                                                        >
                                                                                <span class="elevation elevation_depth_2 button__elevation"></span>
                                                                                contact
                                                                                me
                                                                        </button>
                                                                </a>
                                                                <a href="/about">
                                                                        <button
                                                                                class="button button_type_ghost button_color_primary-light button_size_m
               text text_style_small-caps text_align_center text_size_s text_weight_regular"
                                                                        >
                                                                                <span class="elevation elevation_depth_2 button__elevation"></span>
                                                                                learn
                                                                                more
                                                                        </button>
                                                                </a>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </Fragment>
);

export const IndexTitle = () => <title>moki - main</title>;

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
