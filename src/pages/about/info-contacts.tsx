import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";
import { InfoHeading } from "./info-heading";
import { Telegram, Email, Github, Twitter } from "./icons";

const ListItem = ({
        icon,
        text,
        url
}: {
        icon: Function;
        text: string;
        url: null | string;
}) => {
        const textClasses =
                "info-list__text text text_size_s text_weight_medium text_style_small-caps";
        const iconClasses = "info-list__icon text";
        const Icon = icon;
        const li = () => (
                <li class="list__item info-list__item">
                        <Icon classes={iconClasses} />
                        <div class={textClasses}>{text}</div>
                </li>
        );
        return url ? (
                <a href={url} target="_blank">
                        {li()}
                </a>
        ) : (
                li()
        );
};

const List = ({
        id,
        items,
        size
}: {
        id: string;
        items: { icon: Function; text: string; url?: string }[];
        size: "s" | "m" | "l";
}) => {
        return (
                <ul id={id} class={`list list_size_${size}`}>
                        {items.map(e => {
                                return (
                                        <ListItem
                                                url={e.url ?? null}
                                                icon={e.icon}
                                                text={e.text}
                                        />
                                );
                        })}
                </ul>
        );
};

const direct = [
        { icon: Email, text: "morozov.kirill.moki@gmail.com" },
        { icon: Telegram, text: "mokicodes", url: "https://t.me/mokicodes" }
];

const socials = [
        {
                icon: Github,
                text: "moki",
                url: "https://github.com/moki"
        },
        {
                icon: Twitter,
                text: "mokicodes",
                url: "https://twitter.com/mokicodes"
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
