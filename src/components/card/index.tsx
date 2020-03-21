import { h } from "../../../lib/h";

export const Card = ({
        actionable,
        children,
        ...rest
}: {
        actionable?: boolean;
        children?: any[];
        rest?: { [key: string]: string };
}) => {
        let c = "card";
        if (actionable) c = c + " " + "card_actionable";

        return (
                <div class={c} {...rest}>
                        <div class="elevation elevation_depth_1 card__elevation"></div>
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
