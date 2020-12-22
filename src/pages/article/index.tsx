import { h } from "preact";
import { useEffect } from "preact/hooks";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Main } from "src/components/main";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { SectionArticle } from "./section-article";
import { SectionNewsletter } from "src/pages/home/section-newsletter";

export function Article() {
        const animatePosY = Animation(decfn, 250, 0);
        const animateOpacity = Animation(decfn, 250, 0);
        const styles =
                `opacity: ${1 * animateOpacity};` +
                `transform: translateY(${32 - animatePosY * 32}px);`;

        useEffect(() => {
                if (animatePosY === 1) window.scrollTo(0, 0);
        }, []);

        return (
                <Main classes="grid container container_article" style={styles}>
                        <Content>
                                <SectionArticle />
                                <SectionNewsletter />
                        </Content>
                </Main>
        );
}

Promise.all(
        [
                import("src/pages/home/section-newsletter.css"),
                import("src/components/elevation/styles.css"),
                import("src/components/textfield/styles.css"),
                import("src/components/container/styles.css"),
                import("src/components/button/styles.css"),
                import("src/components/section/styles.css"),
                import("src/components/card/styles.css"),
                import("src/components/article/styles.css"),
                import("src/components/article/paragraph.css"),
                import("src/components/article/heading.css"),
                import("src/pages/article/styles.css"),
                import("src/pages/article/content.css"),
                import("src/pages/article/section-article.css"),
        ].map(resolveDefault)
).then(insertStyles);
