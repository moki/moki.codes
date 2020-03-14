import { h, Fragment } from "../../lib/h";

export const IndexMain = () => (
        <Fragment>
                <div class="layout__container section">main</div>
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
