import { h, Fragment } from "../../lib/h";

export const IndexMain = () => (
        <Fragment>
                <div class="main">
                        <p>main content</p>
                </div>
        </Fragment>
);

export const IndexTitle = () => <title>moki - main</title>;

export const IndexStyles = () => (
        <Fragment>
                <link rel="stylesheet" type="text/css" href="/index.js.css" />
        </Fragment>
);

export const IndexScripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                <script defer src="/commons.js"></script>
                <script defer src="/index.js"></script>
        </Fragment>
);
