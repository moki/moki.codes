import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

export type ButtonType = "contained" | "outlined" | "flat";

export type ButtonState = 0 | 1 | 2;

export type ButtonProps = JSX.IntrinsicElements & {
        children?: JSX.Element | JSX.Element[];
        disabled?: boolean;
        classes?: string;
        href?: string;
        appearance: ButtonType;
};

type ButtonShadowsProps = {
        appearance: ButtonType;
        state: ButtonState;
};

function ButtonShadows({ appearance, state }: ButtonShadowsProps) {
        return appearance === "flat" ? (
                <div
                        class="button__shadow button_flat__shadow elevation"
                        style={`opacity: ${
                                !state ? 0 : state === 1 ? 0.14 : 0.38
                        }`}
                ></div>
        ) : (
                <Fragment>
                        <div
                                class="button__shadow elevation elevation_depth_2"
                                style={`opacity: ${!state ? 1 : 0}`}
                        ></div>
                        <div
                                class="button__shadow elevation elevation_depth_4"
                                style={`
                        opacity: ${state === 1 ? 1 : 0}
                        `}
                        ></div>
                        <div
                                class="button__shadow elevation elevation_depth_8"
                                style={`
                        opacity: ${state === 2 ? 1 : 0}
                        `}
                        ></div>
                </Fragment>
        );
}

export function Button({
        children,
        disabled = false,
        classes = "",
        href = "",
        appearance,
        ...rest
}: ButtonProps) {
        const [state, setState] = useState(0 as ButtonState);

        let _classes =
                "button" +
                " " +
                `button_${appearance}` +
                `${href ? " " + "button_link" : ""}` +
                `${classes ? " " + classes : ""}` +
                `${disabled ? " " + "button_disabled" : ""}`;

        const shadowMixin = {
                onMouseOver: function(e: Event) {
                        setState(1);
                },
                onMouseOut: function(e: Event) {
                        setState(0);
                },
                onMouseDown: function(e: Event) {
                        e.preventDefault();
                        setState(2);
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
                        <ButtonShadows appearance={appearance} state={state} />
                        {children}
                </a>
        ) : (
                <button
                        class={_classes}
                        disabled={disabled}
                        {...(!disabled ? shadowMixin : {})}
                        {...rest}
                >
                        <ButtonShadows appearance={appearance} state={state} />
                        {children}
                </button>
        );
}
