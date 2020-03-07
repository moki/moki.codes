import { h, Fragment } from "../lib/h";
import { Map } from "../types/";

export const Layout = ({ Title, Styles, Scripts, children }: Map<any>) => {
        return (
                <html>
                        <head>
                                <Title />
                                <Styles />
                        </head>
                        <body>
                                <header></header>
                                <main id="root">{children}</main>
                                <footer></footer>
                                <Scripts />
                        </body>
                </html>
        );
};
