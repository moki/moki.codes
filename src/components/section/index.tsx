import { h, Fragment } from "../../../lib/h";

export const Section = ({
        vpadding,
        children,
        classes,
        styles
}: {
        vpadding: "s" | "m" | "l";
        classes?: string;
        styles?: string;
        children?: any;
}) => {
        let cs = "section";
        if (classes) cs = cs + " " + classes;
        return (
                <div
                        class={cs + ` vpadding_${vpadding}`}
                        {...(styles ? { style: styles } : {})}
                >
                        {children}
                </div>
        );
};
