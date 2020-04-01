import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";
import { InfoHeading } from "./info-heading";
import { Telegram, Email, Github, Twitter } from "./icons";

const List = ({
        id,
        items,
        size
}: {
        id: string;
        items: { icon: Function; text: string }[];
        size: "s" | "m" | "l";
}) => {
        const textClasses =
                "info-list__text text text_size_s text_weight_medium text_style_small-caps";
        const iconClasses = "info-list__icon text";
        return (
                <ul id={id} class={`list list_size_${size}`}>
                        {items.map(e => {
                                const Icon = e.icon;
                                return (
                                        <li class="list__item info-list__item">
                                                <Icon classes={iconClasses} />
                                                <div
                                                        class={textClasses}
                                                        style="line-height: var(--msp-1) !important;"
                                                >
                                                        {e.text}
                                                </div>
                                        </li>
                                );
                        })}
                </ul>
        );
};

const direct = [
        { icon: Email, text: "morozov.kirill.moki@gmail.com" },
        { icon: Telegram, text: "mokicodes", value: "https://t.me/mokicodes" }
];

const socials = [
        {
                icon: Github,
                text: "moki",
                value: "https://github.com/moki"
        },
        {
                icon: Twitter,
                text: "mokicodes",
                value: "https://twitter.com/mokicodes"
        }
];

export const Contacts = ({ classes }: { classes?: string }) => (
        <Fragment>
                <div class={`${classes}`}>
                        <InfoHeading id="contacts">contacts</InfoHeading>
                        <div class="card elevation elevation_depth_2">
                                <List
                                        id="contacts-direct"
                                        items={direct}
                                        size="l"
                                />
                        </div>
                </div>
                <div class={`${classes}`}>
                        <InfoHeading id="socials">socials</InfoHeading>
                        <div class="card elevation elevation_depth_2">
                                <List
                                        id="contacts-socials"
                                        items={socials}
                                        size="l"
                                />
                        </div>
                </div>
        </Fragment>
);
