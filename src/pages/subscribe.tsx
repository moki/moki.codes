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

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_4xl subscribe-section__title">{children}</h2>
);

const Subheader = ({ children }: { children?: any }) => (
        <h3 class="text text_size_l text_weight_medium subscribe-section__subtitle">
                {children}
        </h3>
);

export const Subscribe = () => {
        return (
                <Section vpadding="l" classes="section-subscribe">
                        <Container classes="subscribe">
                                <Header>Stay Tuned</Header>
                                <Subheader>Subscribe for updates</Subheader>
                                <Card elevation={1}></Card>
                        </Container>
                </Section>
        );
};
