import { h } from "preact";
import { Card, CardHeader, CardBody } from "src/components/card";
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
                                                This page is still under
                                                construction.
                                        </p>
                                        <p>
                                                For now, most of my code can be
                                                found on{" "}
                                                <a
                                                        class="link"
                                                        href="https://github.com/moki"
                                                        target="_blank"
                                                        rel="noopener"
                                                >
                                                        github
                                                </a>
                                                .
                                        </p>
                                </CardBody>
                        </Card>
                </Section>
        );
}
