import { h, Fragment } from "../../../lib/h";

export const Container = ({
        children,
        classes,
        styles
}: {
        classes?: string;
        styles?: string;
        children?: any;
}) => {
        let cs = "layout__container";
        if (classes) cs = cs + " " + classes;
        return (
                <div class={cs} {...(styles ? { style: styles } : {})}>
                        {children}
                </div>
        );
};
