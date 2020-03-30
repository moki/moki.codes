import { h, Fragment } from "../../../lib/h";

import { Container } from "../../components/container";
import { Section } from "../../components/section";

const Header = ({ children }: { children?: any }) => (
        <h1 class="text text_size_4xl about-section-hero__title">{children}</h1>
);

const Subheader = ({ children }: { children?: any }) => (
        <h2 class="text text_size_l text_weight_medium about-section-hero__subtitle">
                {children}
        </h2>
);

export const Hero = () => (
        <Section vpadding="l" classes="about-section-hero">
                <Container>
                        <Header>About</Header>
                        <Subheader>Learn more about me</Subheader>
                </Container>
        </Section>
);