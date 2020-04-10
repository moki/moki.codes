import { h, Fragment } from "../../../lib/h";

import { Container } from "../../components/container";
import { Section } from "../../components/section";

const Header = ({ children }: { children?: any }) => (
        <h1 class="text_line-height_xl text_size_4xl text_weight_xbold code-section-hero__title">
                {children}
        </h1>
);

const Subheader = ({ children }: { children?: any }) => (
        <h2 class="text_line-height_m text_size_l text_weight_medium code-section-hero__subtitle">
                {children}
        </h2>
);

const Text = ({ children, styles }: { children?: any; styles?: string }) => {
        const textClasses =
                "text_line-height_m text_size_m text_weight_regular text_length_m";
        return (
                <p class={textClasses} style={styles}>
                        {children}
                </p>
        );
};

export const Hero = () => (
        <Section vpadding="l" classes="articles-section-hero">
                <Container>
                        <Header>Code</Header>
                        <Subheader>Projects, OSS contributions</Subheader>
                        <Text>This page is still under construction.</Text>
                        <Text>
                                For now, most of my code can be found on{" "}
                                <a
                                        class="link link_color_primary link_underline"
                                        href="https://www.github.com/moki"
                                >
                                        github
                                </a>
                                .
                        </Text>
                </Container>
        </Section>
);
