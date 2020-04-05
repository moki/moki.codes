import { h, Fragment } from "../../../lib/h";

import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../../components/card";

import { SeparatorHorizontal } from "../../components/separator";

import { Container } from "../../components/container";
import { Intro } from "./info-intro";
import { Work } from "./info-work";
import { Education } from "./info-edu";
import { Contacts } from "./info-contacts";

export const Info = () => (
        <div class="elevation elevation_depth_1">
                <Container classes="info__story">
                        <Intro classes="info__chapter" />
                        <SeparatorHorizontal />
                        <div class="info__left">
                                <Work classes="info__chapter" />
                                <Education classes="info__chapter" />
                        </div>
                        <div class="info__right">
                                <Contacts classes="info__chapter" />
                        </div>
                </Container>
        </div>
);