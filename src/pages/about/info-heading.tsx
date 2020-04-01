import { h, Fragment } from "../../../lib/h";

const Icon = ({ classes }: { classes: string }) => (
        <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                class={classes}
        >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
        </svg>
);

export const InfoHeading = ({
        id,
        children
}: {
        id: string;
        children?: any;
}) => {
        const headingClasses = "info__heading";
        const headerClasses =
                "text text_size_xl text_style_small-caps info__header";
        const iconClasses = "info__heading-icon";
        return (
                <a class={headingClasses} href={`/about#${id}`} id={id}>
                        <h2 class={headerClasses}>{children}</h2>
                        <Icon classes={iconClasses} />
                </a>
        );
};
