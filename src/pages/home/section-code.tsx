import { h } from "preact";
import { Card, CardHeader, CardBody, CardActions } from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { handleClick } from "src/components/router-link";

const Title = <div class="section-code__title">Code</div>;
const Subtitle = (
        <div class="section-code__subtitle">Projects, OSS contributions</div>
);

export function SectionCode() {
        return (
                <Section>
                        <Card elevation={1}>
                                <CardHeader
                                        classes="section-code__header"
                                        elevation={1}
                                >
                                        {Title}
                                        {Subtitle}
                                </CardHeader>
                                <CardBody classes="section-code__body">
                                        <p>
                                                Select collection of projects
                                                and oss contributions.
                                        </p>
                                        <p>
                                                Ranging from the system
                                                programming and programming
                                                languages to the front-end and
                                                back-end web.
                                        </p>
                                </CardBody>
                                <CardActions>
                                        <Button
                                                appearance="outlined"
                                                onClick={handleClick("/code")}
                                        >
                                                check it
                                        </Button>
                                </CardActions>
                        </Card>
                </Section>
        );
}
