import { h, Fragment } from "../../../lib/h";

import { Card, CardText, CardHeader, CardBody, CardFooter } from "../card";

type ArticlePreview = {
        id: number;
        title: string;
        subtitle: string;
        tags: string[];
        prettydate: string;
        unixtimestamp: number;
};

const ArticlePreviewTag = ({ children }: { children?: any }) => (
        <h6 class="text_line-height_m text_size_m text_weight_xbold text_style_small-caps text_letter-spacing_m article-preview__tags">
                {children}
        </h6>
);

const ArticlePreviewTitle = ({ children }: { children?: any }) => (
        <h4 class="text_line-height_m text_size_l text_weight_medium text_letter-spacing_m article-preview__title">
                {children}
        </h4>
);

const ArticlePreviewSubtitle = ({ children }: { children?: any }) => (
        <h5 class="text_line-height_s text_size_s text_weight_regular article-preview__subtitle">
                {children}
        </h5>
);

const ArticlePreviewDate = ({
        date,
        children
}: {
        date: string;
        children?: any;
}) => (
        <p class="text_line-height_s text_size_s text_weight_medium text_style_small-caps text_letter-spacing_m article-preview__date">
                {date.split("-").join("/")}
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
                                                date={preview.prettydate}
                                        />
                                </CardBody>
                        </CardText>
                </Card>
        );
};
