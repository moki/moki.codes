import { h } from "../../../lib/h";

export const ButtonGhost = ({
        children,
        size,
        color,
        classes,
        styles,
        elevation,
        disabled
}: {
        children?: any;
        size: "s" | "m" | "l";
        color: "primary" | "primary-light" | "primary-dark";
        elevation: number;
        disabled?: boolean;
        classes?: string;
        styles?: string;
}) => {
        let buttonClasses = `button button_type_ghost button_size_${size} button_color_${color}`;
        if (classes) buttonClasses = buttonClasses + " " + classes;
        const elevationClasses = `elevation elevation_depth_${elevation} button__elevation`;
        return (
                <button
                        class={buttonClasses}
                        {...(styles ? { style: styles } : {})}
                        {...(disabled ? { disabled: "" } : {})}
                >
                        <span class={elevationClasses}></span>
                        {children}
                </button>
        );
};

export const ButtonRaised = ({
        children,
        size,
        color,
        classes,
        styles,
        elevation,
        disabled
}: {
        children?: any;
        size: "s" | "m" | "l";
        color: "primary" | "primary-light" | "primary-dark";
        elevation: number;
        disabled?: boolean;
        classes?: string;
        styles?: string;
}) => {
        let buttonClasses = `button button_type_raised button_color_${color} button_size_${size}`;
        if (classes) buttonClasses = buttonClasses + " " + classes;
        const elevationClasses = `elevation elevation_depth_${elevation} button__elevation`;
        return (
                <button
                        class={buttonClasses}
                        {...(disabled ? { disabled: "" } : {})}
                >
                        <span class={elevationClasses}></span>
                        {children}
                </button>
        );
};
