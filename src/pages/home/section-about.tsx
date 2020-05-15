import { h } from "preact";

import {
        Card,
        CardMedia,
        CardHeader,
        CardBody,
        CardActions
} from "src/components/card";
import { Button } from "src/components/button";
import { Section } from "src/components/section";
import { RouterLink } from "src/components/router-link";

import { useLocation } from "wouter-preact";

const Headshot = (
        <CardMedia
                url="/headshot.jpg"
                width="288px"
                classes="section-about__media"
        />
);
const Overline = <div class="section-about__overline">hey, my name is</div>;
const Title = <div class="section-about__title">kirill morozov</div>;
const Contact = (
        <Button
                classes="section-about__action-contained"
                appearance="contained"
        >
                contact me
        </Button>
);
const Learn = (
        <Button classes="section-about__action-outlined" appearance="outlined">
                learn more
        </Button>
);

export function SectionAbout() {
        return (
                <Section>
                        <Card elevation={1} media={Headshot}>
                                <CardHeader>
                                        {Overline}
                                        {Title}
                                </CardHeader>
                                <CardBody classes="section-about__body">
                                        I am software engineer who writes{" "}
                                        <RouterLink name="code" href="/code" />{" "}
                                        and{" "}
                                        <RouterLink
                                                name="articles"
                                                href="/articles"
                                        />
                                        .
                                </CardBody>
                                <CardActions>
                                        {Contact}
                                        {Learn}
                                </CardActions>
                        </Card>
                </Section>
        );
}
