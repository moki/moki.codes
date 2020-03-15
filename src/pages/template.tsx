import { h, Fragment } from "../../lib/h";

export const IndexMain = () => (
        <Fragment>
                <div class="layout__container section main">
                        <div class="face">
                                <img src="https://i.imgur.com/A6hNrWQ.jpg" />
                        </div>
                        <div class="description">
                                <div class="content card">
                                        <div class="elevation elevation_depth_1 card__elevation"></div>
                                        <div class="card__text">
                                                <div class="card__header">
                                                        <h4 class="text text_size_l text_weight_light">
                                                                Hey, my name is
                                                        </h4>
                                                        <h1 class="text text_size_2xl text_weight_light title">
                                                                Kirill Morozov
                                                        </h1>
                                                </div>
                                                <div class="card__body">
                                                        <p class="text text_size_m text_weight_regular legend">
                                                                I am software
                                                                engineer who
                                                                writes{" "}
                                                                <a
                                                                        href="/code"
                                                                        class="link link_inline text text_size_l text_style_small-caps text_weight_medium"
                                                                        style="z-index: 1"
                                                                >
                                                                        code
                                                                </a>{" "}
                                                                and{" "}
                                                                <a
                                                                        href="/articles"
                                                                        class="link link_inline text text_size_l text_style_small-caps text_weight_medium"
                                                                        style="z-index: 1"
                                                                >
                                                                        articles
                                                                </a>{" "}
                                                                about it.
                                                        </p>
                                                </div>
                                                <div class="card__footer">
                                                        <p class="text text_size_m text_weight_regular legend">
                                                                learn more
                                                        </p>
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
