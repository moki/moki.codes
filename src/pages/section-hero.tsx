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

const Media = () => {
        return (
                <img
                        class="hero__media elevation elevation_depth_1"
                        src="https://i.imgur.com/A6hNrWQ.jpg"
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
                "text text_style_small-caps text_size_s text_weight_medium";
        return (
                <Link url="/about#contact">
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
                "text text_style_small-caps text_size_s text_weight_medium";
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

const Story = () => (
        <p class="text text_size_m text_weight_regular">
                I am software engineer who writes{" "}
                <Link
                        url="/code"
                        classes="subtle-link text text_size_l text_style_small-caps"
                >
                        code
                </Link>{" "}
                and{" "}
                <Link
                        url="/articles"
                        classes="subtle-link text text_size_l text_style_small-caps"
                >
                        articles
                </Link>{" "}
                about it.
        </p>
);

const Header = ({ children }: { children?: any }) => (
        <h1 class="text text_size_4xl hero__title">{children}</h1>
);
const Subheader = ({ children }: { children?: any }) => (
        <h6 class="text text_size_l text_weight_light">{children}</h6>
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
