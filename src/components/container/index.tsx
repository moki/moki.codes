import { h, Fragment } from "../../../lib/h";

export const Container = ({
        children,
        classes,
        styles
}: {
        classes?: string;
        styles?: string;
        children?: any;
}) => (
        <div class={`layout__container ${classes}`} style={styles}>
                {children}
        </div>
);
