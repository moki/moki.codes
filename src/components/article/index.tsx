import { h, Fragment } from "preact";
import { Card, CardHeader, CardMedia, CardBody } from "src/components/card";
import { Section } from "src/components/section";

import { Paragraph } from "src/components/article/paragraph";
import { Heading } from "src/components/article/heading";

import { DynamicRenderer } from "lib/dynamic-render";

const renderer = new DynamicRenderer([
        { name: "section", component: Section },
        { name: "heading", component: Heading },
        { name: "paragraph", component: Paragraph },
        { name: "fragment", component: Fragment },
]);

export type ArticleProps = {
        id: string;
        slug: string;
        title: string;
        subtitle: string;
        image?: string;
        tags: string[];
        body: string;
        created: Date;
        updated: Date;
        loading: boolean;
};

export function Article({
        title,
        subtitle,
        image,
        tags,
        body,
        created,
        updated,
        loading,
}: ArticleProps) {
        let article;

        try {
                article = renderer.render(JSON.parse(body));
        } catch (e) {
                article = {};
        }

        return (
                <Card elevation={1}>
                        <CardHeader classes="article__header" elevation={1}>
                                <div class="article__title">
                                        {loading ? "" : title}
                                </div>
                                <div class="article__subtitle">
                                        {loading ? "" : subtitle}
                                </div>
                        </CardHeader>
                        {loading
                                ? ""
                                : image && (
                                          <CardMedia
                                                  url={image}
                                                  width="100%;"
                                                  styles="min-height: 300px;"
                                          />
                                  )}
                        {loading ? (
                                ""
                        ) : (
                                <CardBody classes="article__body">
                                        <Section>
                                                <div class="article__tags">
                                                        {tags.join(" \u2022 ")}
                                                </div>
                                        </Section>
                                        {article}
                                        <Section>
                                                <div class="article__date">
                                                        {created.toLocaleDateString()}
                                                </div>
                                        </Section>
                                </CardBody>
                        )}
                </Card>
        );
}
