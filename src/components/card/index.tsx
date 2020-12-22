import { h } from "preact";

export type CardProps = JSX.IntrinsicElements & {
        classes?: string;
        elevation?: SurfaceElevation;
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
        const _classes =
                `card` +
                `${inset ? " " + "card_inset" : ""}` +
                `${classes ? " " + classes : ""}`;
        const elevationClasses = `card__elevation elevation elevation_depth_${elevation}`;

        return (
                <div class={_classes} {...rest}>
                        <div class={elevationClasses}></div>
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
                `${url ? `background-image: url(${url});` : ""}` +
                `width: ${width};`;
        return (
                <div class={_classes} style={style} {...rest}>
                        {children}
                </div>
        );
}

export type CardHeaderProps = JSX.IntrinsicElements & {
        classes?: string;
        elevation?: SurfaceElevation;
        children?: JSX.Element | JSX.Element[];
};

export function CardHeader({
        classes = "",
        elevation = 0,
        children,
        ...rest
}: CardHeaderProps) {
        const _classes =
                `card__header` +
                `${elevation ? " " + "card__header_elevated" : ""}` +
                `${classes ? " " + classes : ""}`;
        const shadowClasses = `card__header-elevation elevation elevation_depth_${elevation}`;
        return (
                <div class={_classes} {...rest}>
                        <div class={shadowClasses}></div>
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
