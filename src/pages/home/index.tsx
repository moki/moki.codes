import { h } from "preact";
import { useEffect } from "preact/hooks";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Main } from "src/components/main";
import { Section } from "src/components/section";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { SectionAbout } from "./section-about";
import { SectionArticles } from "./section-articles";
import { SectionCode } from "./section-code";
import { SectionNewsletter } from "./section-newsletter";

export function Home() {
        const animatePosY = Animation(decfn, 250, 0);
        const animateOpacity = Animation(decfn, 250, 0);
        const styles =
                `opacity: ${1 * animateOpacity};` +
                `transform: translateY(${32 - animatePosY * 32}px);`;
        useEffect(() => {
                if (animatePosY === 1) window.scrollTo(0, 0);
        }, []);

        return (
                <Main classes="grid container container_home" style={styles}>
                        <Content>
                                <SectionAbout />
                                <SectionArticles />
                                <SectionCode />
                                <SectionNewsletter />
                        </Content>
                </Main>
        );
}

Promise.all(
        [
                import("src/components/card/styles.css"),
                import("src/components/button/styles.css"),
                import("src/components/link/styles.css"),
                import("src/components/container/styles.css"),
                import("src/components/section/styles.css"),
                import("src/components/articles/styles.css"),
                import("src/components/textfield/styles.css"),
                import("src/pages/home/styles.css"),
                import("src/pages/home/content.css"),
                import("src/pages/home/section-about.css"),
                import("src/pages/home/section-articles.css"),
                import("src/pages/home/section-code.css"),
                import("src/pages/home/section-newsletter.css"),
                import("src/pages/home/aside-right.css")
        ].map(resolveDefault)
).then(insertStyles);
