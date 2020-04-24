import { h, Fragment } from "../../lib/h";

import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../components/card";
import { Container } from "../components/container";
import { Section } from "../components/section";
import { ButtonGhost, ButtonRaised } from "../components/button";

let Headshot = { default: "./head-shot.jpg" };

if (
        !(
                typeof process !== "undefined" &&
                process.versions &&
                process.versions.node
        )
)
        Headshot = require("./head-shot.jpg") ?? { default: "" };

const Media = () => {
        return (
                <img
                        src={Headshot.default}
                        class="hero__media elevation elevation_depth_1"
                        alt="kirill morozov headshot"
                />
        );
};

const Link = ({
        url,
        classes,
        children
}: {
        url: string;
        classes?: string;
        children?: any;
}) => (
        <a href={url} class={classes}>
                {children}
        </a>
);

const Contact = () => {
        const buttonClasses =
                "text_line-height_m text_style_small-caps text_letter-spacing_m text_size_s text_weight_bold";
        return (
                <Link url="/about#contacts">
                        <ButtonRaised
                                color="primary-light"
                                size="m"
                                elevation={2}
                                classes={buttonClasses}
                        >
                                contact me
                        </ButtonRaised>
                </Link>
        );
};

const Learn = () => {
        const buttonClasses =
                "text_line-height_m text_style_small-caps text_letter-spacing_m text_size_s text_weight_bold";
        return (
                <Link url="/about">
                        <ButtonGhost
                                color="primary-light"
                                size="m"
                                elevation={2}
                                classes={buttonClasses}
                        >
                                learn more
                        </ButtonGhost>
                </Link>
        );
};

const Story = () => {
        const linkClasses =
                "link link_color_primary text_style_small-caps text_letter-spacing_m";
        return (
                <p class="text_line-height_s text_size_m text_weight_regular">
                        I am software engineer who writes{" "}
                        <Link url="/code" classes={linkClasses}>
                                code
                        </Link>{" "}
                        and{" "}
                        <Link url="/articles" classes={linkClasses}>
                                articles
                        </Link>{" "}
                        about it.
                </p>
        );
};

const Header = ({ children }: { children?: any }) => (
        <h1 class="text_size_4xl text_line-height_m text_style_small-caps text_letter-spacing_m hero__title">
                {children}
        </h1>
);
const Subheader = ({ children }: { children?: any }) => (
        <h6 class="text_size_l text_line-height_s text_style_small-caps text_letter-spacing_m hero__subtitle">
                {children}
        </h6>
);

const Text = () => {
        return (
                <div class="hero__text">
                        <Card elevation={1}>
                                <CardText>
                                        <CardHeader>
                                                <Subheader>
                                                        Hey, my name is
                                                </Subheader>
                                                <Header>Kirill Morozov</Header>
                                        </CardHeader>
                                        <CardBody>
                                                <Story />
                                        </CardBody>
                                        <CardFooter>
                                                <Contact />
                                                <Learn />
                                        </CardFooter>
                                </CardText>
                        </Card>
                </div>
        );
};

export const Hero = () => (
        <Section vpadding="l" classes="section-hero">
                <Container classes="hero">
                        <Media />
                        <Text />
                </Container>
        </Section>
);
