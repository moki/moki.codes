import { h, Fragment } from "../../lib/h";
import config from "../../scripts/config.new.article";

import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../components/card";
import { Container } from "../components/container";
import { Section } from "../components/section";
import { ButtonGhost } from "../components/button";
import { ArticlePreview } from "../components/article-preview";

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_4xl section-articles__title">{children}</h2>
);

const Subheader = ({ children }: { children?: any }) => (
        <h3 class="text text_size_l text_weight_medium section-articles__subtitle">
                {children}
        </h3>
);

const Link = ({ url, children }: { url: string; children?: any }) => (
        <a href={url}>{children}</a>
);

export const Articles = () => {
        const articles = require("./articles/" +
                config.articles.name).articles.slice(0, 3);
        const buttonClasses =
                "text text_style_small-caps text_size_m text_weight_medium";
        return (
                <Section vpadding="l" classes="section-articles">
                        <Container>
                                <Header>Articles</Header>
                                <Subheader>
                                        Mostly about code, but sometimes life
                                </Subheader>
                                {articles.map((e: any) => {
                                        const url = `/articles/${e.title}-${e.prettydate}`;
                                        return (
                                                <Link url={url}>
                                                        <ArticlePreview
                                                                preview={e}
                                                                elevation={1}
                                                        />
                                                </Link>
                                        );
                                })}
                                <Link url="/articles">
                                        <ButtonGhost
                                                elevation={1}
                                                size="l"
                                                color="primary-light"
                                                classes={buttonClasses}
                                        >
                                                see all
                                        </ButtonGhost>
                                </Link>
                        </Container>
                </Section>
        );
};
