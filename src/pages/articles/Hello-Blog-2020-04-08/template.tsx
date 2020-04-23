import { h, Fragment } from "../../../../lib/h";
import config from "../../../../scripts/config.new.article";

import { Section } from "../../../components/section";
import { Container } from "../../../components/container";
import { Card } from "../../../components/card";

import { SubscribeFormTemplate as SubscribeForm } from "../../subscribe-form";

const article = require("./" + config.article.name);

const ArticleHeader = ({ children }: { children?: any }) => {
        const classes = "article__header";
        return <div class={classes}>{children}</div>;
};

const ArticleTag = ({ children }: { children?: any }) => {
        const classes =
                "text_style_small-caps text_letter-spacing_m article__tag";
        return <h3 class={classes}>{children}</h3>;
};

const ArticleDate = ({ children }: { children?: any }) => {
        const classes = "text_style_small-caps article__date";
        return <div class={classes}>{children}</div>;
};

const ArticleTitle = ({ children }: { children?: any }) => {
        const classes =
                "text_style_small-caps text_letter-spacing_m article__title";
        return <h1 class={classes}>{children}</h1>;
};

const ArticleSubtitle = ({ children }: { children?: any }) => {
        const classes =
                "text_style_small-caps text_length_m text_letter-spacing_m article__subtitle";
        return <h2 class={classes}>{children}</h2>;
};

const ArticleText = ({ children }: { children?: any }) => {
        const classes = "article__text";
        return <div class={classes}>{children}</div>;
};

const Article = ({
        title,
        subtitle,
        tags,
        prettydate,
        unixtimestamp,
        id,
        url
}: any) => {
        return (
                <div class="article">
                        <ArticleHeader>
                                <ArticleTag>
                                        {article.tags.join(" \u2022 ")}
                                </ArticleTag>
                                <ArticleTitle>{title}</ArticleTitle>
                                <ArticleSubtitle>{subtitle}</ArticleSubtitle>
                        </ArticleHeader>
                        <ArticleText>
                                <div class="p0">
                                        Hello, let me introduce myself: My name
                                        is Kirill Morozov.
                                </div>
                                <div class="p0">
                                        I am a software engineer working as a
                                        full stack web developer.
                                </div>
                        </ArticleText>
                        <ArticleText>
                                <div class="p1">
                                        Besides web, I am fascinated by systems
                                        programming topics like:
                                </div>
                                <div class="p1">
                                        operating systems, virtual machines, and
                                        databases.
                                </div>
                        </ArticleText>
                        <ArticleText>
                                <div class="p2">
                                        Recently to the addition of the listed
                                        above branches, I've started dabbling in
                                        data science and it's aspects: data
                                        mining, visualization, and
                                        classification.
                                </div>
                                <div class="p2">
                                        Semi-related to that is my
                                        &#171;toying&#187; with Artificial
                                        Intelligence.
                                </div>
                        </ArticleText>
                        <ArticleText>
                                <div class="p3">
                                        This is exactly how i see this blog —
                                </div>
                                <div class="p3">
                                        Small tips and densely compressed TIL
                                        articles about web development. Mixed
                                        with hopefully deep and thoughtful
                                        articles, exploring various
                                </div>
                                <div class="p3">programming topics.</div>
                        </ArticleText>
                        <ArticleText>
                                <div class="p4">
                                        Sounds like something that fits your
                                        beats?
                                </div>
                                <div class="p4">
                                        Then consider subscribing for updates.
                                </div>
                                <div class="p4">
                                        I would Love to have your company!
                                </div>
                        </ArticleText>
                        <ArticleDate>
                                {article.prettydate.split("-").join("/")}{" "}
                        </ArticleDate>
                </div>
        );
};

const Header = ({ children }: { children?: any }) => (
        <h2 class="text_style_small-caps text_letter-spacing_m section-subscribe__title">
                {children}
        </h2>
);

const Subheader = ({ children }: { children?: any }) => (
        <h3 class="text_style_small-caps text_letter-spacing_m section-subscribe__subtitle">
                {children}
        </h3>
);

export const Main = () => {
        return (
                <Fragment>
                        <Section
                                vpadding="l"
                                classes="elevation elevation_depth_1"
                        >
                                <Container>
                                        <Article {...article} />
                                </Container>
                        </Section>
                        <Section
                                vpadding="l"
                                classes="section-subscribe elevation elevation_depth_1"
                        >
                                <Container>
                                        <Header>Stay Tuned</Header>
                                        <Subheader>
                                                Subscribe for updates
                                        </Subheader>
                                        <Card elevation={2}>
                                                <SubscribeForm elevation={2} />
                                        </Card>
                                </Container>
                        </Section>
                </Fragment>
        );
};

export const Title = () => (
        <Fragment>
                <title>
                        {article.title} — {article.subtitle}
                </title>
                <meta
                        name="description"
                        content={`${article.title} — ${article.subtitle
                                .split("<br/>")
                                .join(" ")} ${article.tags.join(" ")}`}
                />
        </Fragment>
);

export const Styles = () => (
        <Fragment>
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/articles/Hello-Blog-2020-04-08/index.css"
                />
                <link rel="stylesheet" type="text/css" href="/global.css" />
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="/vendors~global.css"
                />
        </Fragment>
);

export const Scripts = () => (
        <Fragment>
                <script defer src="/runtime.js"></script>
                {/*<script defer src="/commons.js"></script>*/}
                <script
                        defer
                        src="/articles/Hello-Blog-2020-04-08/index.js"
                ></script>
                <script defer src="/global.js"></script>
                <script defer src="/vendors~global.js"></script>
        </Fragment>
);
