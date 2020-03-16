import { h } from "../../../lib/h";

export const Card = ({ children }: { children?: any[] }) => (
        <div class="content card">
                <div class="elevation elevation_depth_1 card__elevation"></div>
                {children}
        </div>
);

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
