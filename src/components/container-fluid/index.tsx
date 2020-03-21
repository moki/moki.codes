import { h, Fragment } from "../../../lib/h";

export const ContainerFluid = ({
        children,
        classes,
        styles
}: {
        classes?: string;
        styles?: string;
        children?: any;
}) => {
        let containerClasses = "layout__container-fluid";
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
