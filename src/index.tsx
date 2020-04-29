import { render, h, Component, Fragment } from "preact";

function inlineStyle(style: string) {
        document.head.innerHTML += "<style>" + style + "</style>";
}

[import("src/styles.css"), import("lib/reset.css")].forEach(i =>
        i.then(m => inlineStyle(m.default))
);

class App extends Component {
        state = { loaded: false };

        render(...args: any[]) {
                console.log(args);
                return (
                        <Fragment>
                                <div class="form">
                                        <h2>app</h2>
                                        <p>text</p>
                                </div>
                        </Fragment>
                );
        }
}

render(<App />, document.body);
