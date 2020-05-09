import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

export type ButtonProps = JSX.IntrinsicElements & {
        children?: JSX.Element | JSX.Element[];
        disabled?: boolean;
        classes?: string;
        href?: string;
        type: "contained" | "outlined" | "flat";
};

export function Button({
        children,
        disabled = false,
        classes = "",
        href = "",
        type,
        ...rest
}: ButtonProps) {
        const [depth, setDepth] = useState(0);

        let _classes =
                "button" +
                " " +
                `button_${type}` +
                `${href ? " " + "button_link" : ""}` +
                `${classes ? " " + classes : ""}` +
                `${disabled ? " " + "button_disabled" : ""}`;

        const shadows =
                type === "flat" ? (
                        <div
                                class="button__shadow button_flat__shadow elevation"
                                style={`opacity: ${
                                        !depth ? 0 : depth === 1 ? 0.14 : 0.38
                                }`}
                        ></div>
                ) : (
                        <Fragment>
                                <div
                                        class="button__shadow elevation elevation_depth_2"
                                        style={`opacity: ${!depth ? 1 : 0}`}
                                ></div>
                                <div
                                        class="button__shadow elevation elevation_depth_4"
                                        style={`
                        opacity: ${depth === 1 ? 1 : 0}
                        `}
                                ></div>
                                <div
                                        class="button__shadow elevation elevation_depth_8"
                                        style={`
                        opacity: ${depth === 2 ? 1 : 0}
                        `}
                                ></div>
                        </Fragment>
                );

        const shadowMixin = {
                onMouseOver: function(e: Event) {
                        setDepth(1);
                },
                onMouseOut: function(e: Event) {
                        setDepth(0);
                },
                onMouseDown: function(e: Event) {
                        e.preventDefault();
                        setDepth(2);
                }
        };

        return href ? (
                <a
                        class={_classes}
                        href={href}
                        disabled={disabled}
                        {...(!disabled ? shadowMixin : {})}
                        {...rest}
                >
                        {shadows}
                        {children}
                </a>
        ) : (
                <button
                        class={_classes}
                        disabled={disabled}
                        {...(!disabled ? shadowMixin : {})}
                        {...rest}
                >
                        {shadows}
                        {children}
                </button>
        );
}
