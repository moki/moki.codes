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
        let sectionClasses = `section vpadding_${vpadding}`;
        if (classes) sectionClasses = sectionClasses + " " + classes;
        return (
                <div
                        class={sectionClasses}
                        {...(styles ? { style: styles } : {})}
                >
                        {children}
                </div>
        );
};
