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
        let containerClasses = "layout__container";
        if (classes) containerClasses = containerClasses + " " + classes;
        return (
                <div
                        class={containerClasses}
                        {...(styles ? { style: styles } : {})}
                >
                        {children}
                </div>
        );
};
