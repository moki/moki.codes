import { h } from "preact";
import { useState } from "preact/hooks";

export type CardProps = JSX.IntrinsicElements & {
        classes?: string;
        elevation?: number;
        media?: ReturnType<typeof CardMedia>;
        inset?: boolean;
        children?: JSX.Element | JSX.Element[];
};

export function Card({
        classes = "",
        elevation = 0,
        children,
        media,
        inset,
        ...rest
}: CardProps) {
        const [depth, setDepth] = useState(~~~inset!);
        const _classes = `card${classes ? " " + classes : ""}`;
        const elevationClasses = `card__elevation elevation elevation_depth_${elevation}`;
        const elevationStyles = `opacity: ${inset ? depth : 1}`;

        const insetMixin = {
                onMouseOver: (e: Event) => {
                        setDepth(Math.abs(depth - 1));
                },
                onMouseOut: (e: Event) => {
                        setDepth(Math.abs(depth - 1));
                }
        };

        return (
                <div class={_classes} {...rest} {...(inset ? insetMixin : {})}>
                        <div
                                class={elevationClasses}
                                style={elevationStyles}
                        ></div>
                        {media ?? ""}
                        <div class="card__text">{children}</div>
                </div>
        );
}

export type CardMediaProps = JSX.IntrinsicElements & {
        url: string;
        width: string;
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function CardMedia({
        width,
        url,
        classes = "",
        styles = "",
        children,
        ...rest
}: CardMediaProps) {
        const _classes = `card__media${classes ? " " + classes : ""}`;
        const style =
                `${styles ? styles : ""}` +
                `background-image: url("${url}");` +
                `width: ${width};`;
        return (
                <div class={_classes} style={style} {...rest}>
                        {children}
                </div>
        );
}

export type CardHeaderProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function CardHeader({
        classes = "",
        children,
        ...rest
}: CardHeaderProps) {
        const _classes = `card__header${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}

export type CardBodyProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function CardBody({ classes = "", children, ...rest }: CardBodyProps) {
        const _classes = `card__body${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}

export type CardActionsProps = JSX.IntrinsicElements & {
        classes?: string;
        children?: JSX.Element | JSX.Element[];
};

export function CardActions({
        classes = "",
        children,
        ...rest
}: CardActionsProps) {
        const _classes = `card__actions${classes ? " " + classes : ""}`;
        return (
                <div class={_classes} {...rest}>
                        {children}
                </div>
        );
}
