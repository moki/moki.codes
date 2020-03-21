import { h } from "../../../lib/h";

export const Card = ({
        actionable,
        elevation,
        classes,
        styles,
        children
}: {
        actionable?: boolean;
        elevation: number;
        classes?: string;
        styles?: string;
        children?: any[];
}) => {
        let cardClasses = "card";
        if (actionable) cardClasses = cardClasses + " card_actionable";
        if (classes) cardClasses = cardClasses + " " + classes;
        let elevationClasses = `elevation elevation_depth_${elevation} card__elevation`;

        return (
                <div class={cardClasses} {...(styles ? { style: styles } : {})}>
                        <div class={elevationClasses}></div>
                        {children}
                </div>
        );
};

export const CardText = ({ children }: { children?: any[] }) => (
        <div class="card__text">{children}</div>
);

export const CardHeader = ({ children }: { children?: any[] }) => (
        <div class="card__header">{children}</div>
);

export const CardBody = ({ children }: { children?: any[] }) => (
        <div class="card__body">{children}</div>
);

export const CardFooter = ({ children }: { children?: any[] }) => (
        <div class="card__footer">{children}</div>
);
