import { h, Fragment } from "../lib/h";

export const Layout = (props: any) => {
        const value = 123;
        return (
                <html>
                        <div style="background-color: purple; color: white;">
                                Hello world {value}
                        </div>
                        {props.children}
                        <script defer src="/bundle.js"></script>
                </html>
        );
};

export const FComponent = (props: any) => {
        return (
                <Fragment>
                        <div>{props.name}</div>
                        <div>{props.likes}</div>
                </Fragment>
        );
};
