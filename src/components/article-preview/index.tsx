import { h, Fragment } from "../../../lib/h";

import { Card, CardText, CardHeader, CardBody, CardFooter } from "../card";

type ArticlePreview = {
        title: string;
        subtitle: string;
        tags: string[];
        date: Date;
};

const ArticlePreviewTag = ({ children }: { children?: any }) => (
        <h6 class="text text_size_s text_weight_medium text_style_small-caps article-preview__tags">
                {children}
        </h6>
);

const ArticlePreviewTitle = ({ children }: { children?: any }) => (
        <h4 class="text text_size_xl text_weight_medium article-preview__title">
                {children}
        </h4>
);

const ArticlePreviewSubtitle = ({ children }: { children?: any }) => (
        <h5 class="text text_size_s text_weight_medium text_style_small-caps article-preview__subtitle">
                {children}
        </h5>
);

const ArticlePreviewDate = ({
        date,
        children
}: {
        date: Date;
        children?: any;
}) => (
        <p class="text text_size_s text_weight_light text_style_small-caps">
                {date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear()}
        </p>
);

export const ArticlePreview = ({
        elevation,
        preview
}: {
        elevation: number;
        preview: ArticlePreview;
}) => {
        return (
                <Card
                        actionable
                        elevation={elevation}
                        classes="article-preview"
                >
                        <CardText>
                                <CardHeader>
                                        <ArticlePreviewTag>
                                                {preview.tags.join(" \u2022 ")}
                                        </ArticlePreviewTag>
                                        <ArticlePreviewTitle>
                                                {preview.title}
                                        </ArticlePreviewTitle>
                                        <ArticlePreviewSubtitle>
                                                {preview.subtitle}
                                        </ArticlePreviewSubtitle>
                                </CardHeader>
                                <CardBody>
                                        <ArticlePreviewDate
                                                date={preview.date}
                                        />
                                </CardBody>
                        </CardText>
                </Card>
        );
};
