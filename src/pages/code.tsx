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
import { ButtonGhost } from "../components/button";

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_4xl section-code__title">{children}</h2>
);

const Subheader = ({ children }: { children?: any }) => (
        <h3 class="text text_size_l text_weight_medium section-code__subtitle">
                {children}
        </h3>
);

const Text = ({ children }: { children?: any }) => (
        <p class="text text_size_m text_length_m section-code__text">
                {children}
        </p>
);

const Link = ({ url, children }: { url: string; children?: any }) => (
        <a href={url}>{children}</a>
);

export const Code = () => {
        const sectionClasses = "section-code elevation elevation_depth_1";
        const buttonClasses =
                "text text_style_small-caps text_size_m text_weight_medium";
        return (
                <Section vpadding="l" classes={sectionClasses}>
                        <Container>
                                <Header>Code</Header>
                                <Subheader>
                                        Projects, OSS contributions
                                </Subheader>
                                <Text>
                                        Select collection of the projects and
                                        oss contributions. Ranging from the
                                        system programming and programming
                                        languages to the front-end and back-end
                                        web.
                                </Text>
                                <Link url="/code">
                                        <ButtonGhost
                                                size="l"
                                                color="primary-light"
                                                elevation={1}
                                                classes={buttonClasses}
                                        >
                                                Show
                                        </ButtonGhost>
                                </Link>
                        </Container>
                </Section>
        );
};
