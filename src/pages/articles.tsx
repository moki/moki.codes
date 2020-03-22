import { h, Fragment } from "../../lib/h";

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
        const articles = [
                {
                        title: "Memory management",
                        subtitle: "how important is it",
                        tags: ["cpp", "programming"],
                        date: new Date(),
                        url: "/articles"
                },
                {
                        title: "Memory management",
                        subtitle: "how important is it",
                        tags: ["cpp", "programming"],
                        date: new Date(),
                        url: "/articles"
                }
        ];
        const buttonClasses =
                "text text_style_small-caps text_size_m text_weight_medium";
        return (
                <Section vpadding="l" classes="section-articles">
                        <Container>
                                <Header>Articles</Header>
                                <Subheader>
                                        Mostly about code, but sometimes life
                                </Subheader>
                                {articles.map(e => {
                                        return (
                                                <Link url={e.url}>
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
