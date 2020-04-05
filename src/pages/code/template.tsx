import { h, Fragment } from "../../../lib/h";

export const Main = () => (
        <Fragment>
                <div class="layout__container section">
                        <div style="height: 1000vh">about</div>
                        <div id="contact">contact</div>
                </div>
        </Fragment>
);

export const Title = () => <title>moki - about</title>;

export const Styles = () => (
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

export const Scripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                {/*<script defer src="/commons.js"></script>*/}
                <script defer src="/about/index.js"></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
