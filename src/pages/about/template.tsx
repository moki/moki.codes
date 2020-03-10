import { h, Fragment } from "../../../lib/h";

export const AboutMain = () => (
        <Fragment>
                <div class="main about">
                        <a href="/">main</a>
                        <p>about</p>
                </div>
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
        </Fragment>
);

export const AboutScripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                <script defer src="/commons.js"></script>
                <script defer src="/about/index.js"></script>
        </Fragment>
);
