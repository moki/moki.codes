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
import { RouterLink, handleClick } from "src/components/router-link";

const Headshot = (
        <CardMedia
                url="static/kirill-morozov-0.jpg"
                width="288px"
                classes="section-about__media"
        />
);
const Overline = <div class="section-about__overline">hey, my name is</div>;
const Title = <div class="section-about__title">kirill morozov</div>;

export function SectionAbout() {
        const Contact = (
                <Button
                        classes="section-about__action-contained"
                        appearance="contained"
                        onClick={handleClick("/about#contacts")}
                >
                        Contact me
                </Button>
        );
        const Learn = (
                <Button
                        classes="section-about__action-outlined"
                        appearance="outlined"
                        onClick={handleClick("/about")}
                >
                        learn more
                </Button>
        );
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
