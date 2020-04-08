import { h, Fragment } from "../../../lib/h";

import { Container } from "../../components/container";
import { Section } from "../../components/section";

const Header = ({ children }: { children?: any }) => (
        <h1 class="text_line-height_xl text_size_4xl text_weight_xbold articles-section-hero__title">
                {children}
        </h1>
);

const Subheader = ({ children }: { children?: any }) => (
        <h2 class="text_line-height_m text_size_l text_weight_medium articles-section-hero__subtitle">
                {children}
        </h2>
);

export const Hero = () => (
        <Section vpadding="l" classes="articles-section-hero">
                <Container>
                        <Header>Articles</Header>
                        <Subheader>
                                Mostly about code, but sometimes life
                        </Subheader>
                </Container>
        </Section>
);
