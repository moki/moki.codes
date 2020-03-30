import { h, Fragment } from "../../../lib/h";

import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../../components/card";

import { Container } from "../../components/container";
import { Section } from "../../components/section";
import { Intro } from "./info-intro";

export const Info = () => (
        <Section vpadding="l">
                <Container>
                        <Card elevation={1} classes="info__story">
                                <Intro classes="info__chapter" />
                        </Card>
                </Container>
        </Section>
);
