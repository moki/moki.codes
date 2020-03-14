import { h } from "../../../lib/h";

export const Main = ({ children, ...rest }: any) => {
        const classes = ["layout__main"].join(" ");

        return (
                <main class={classes} id="root">
                        {children}
                </main>
        );
};
