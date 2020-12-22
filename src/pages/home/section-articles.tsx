import { h } from "preact";
import { Card, CardHeader, CardBody, CardActions } from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { Articles } from "src/components/articles";
import { handleClick } from "src/components/router-link";
import { ArticlesContainer } from "src/containers/articles";

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
                                <CardBody classes="section-articles__body">
                                        <ArticlesContainer
                                                limit={1}
                                                endpoint="/api/posts"
                                        />
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
