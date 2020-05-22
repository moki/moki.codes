import { h } from "preact";
import { Card, CardHeader, CardBody, CardActions } from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { Articles } from "src/components/articles";
import { handleClick } from "src/components/router-link";

const articles: Articles = [
        {
                title: "hello, world!",
                subtitle: "Ehm. I mean... Hello, blog; or what to expect",
                tags: [
                        "meta",
                        "web",
                        "os",
                        "vm",
                        "data science",
                        "ai",
                        "programming"
                ],
                unixtimestamp: Math.floor(Date.now() / 1000)
        },
        {
                title: "hello, world!",
                subtitle: "Ehm. I mean... Hello, blog; or what to expect",
                tags: [
                        "meta",
                        "web",
                        "os",
                        "vm",
                        "data science",
                        "ai",
                        "programming"
                ],
                unixtimestamp: Math.floor(Date.now() / 1000)
        },
        {
                title: "hello, world!",
                subtitle: "Ehm. I mean... Hello, blog; or what to expect",
                tags: [
                        "meta",
                        "web",
                        "os",
                        "vm",
                        "data science",
                        "ai",
                        "programming"
                ],
                unixtimestamp: Math.floor(Date.now() / 1000)
        }
];

const Title = <div class="section-articles__title">Articles</div>;
const Subtitle = (
        <div class="section-articles__subtitle">
                Mostly about code, sometimes life
        </div>
);

export function SectionArticles() {
        return (
                <Section classes="section-articles">
                        <Card elevation={1}>
                                <CardHeader
                                        classes="section-articles__header"
                                        elevation={1}
                                >
                                        {Title}
                                        {Subtitle}
                                </CardHeader>
                                <CardBody>
                                        <Articles articles={articles} />
                                </CardBody>
                                <CardActions>
                                        <Button
                                                appearance="outlined"
                                                onClick={handleClick(
                                                        "/articles"
                                                )}
                                        >
                                                see all
                                        </Button>
                                </CardActions>
                        </Card>
                </Section>
        );
}
