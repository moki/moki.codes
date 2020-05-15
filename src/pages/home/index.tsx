import { h } from "preact";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Main } from "src/components/main";
import { Section } from "src/components/section";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { ASideRight } from "./aside-right";
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

        //if (animatePosY === 1) window.scrollTo(0, 0);

        return (
                <Main classes="grid container" style={styles}>
                        <Content>
                                <SectionAbout />
                                <SectionArticles />
                                <SectionCode />
                                <SectionNewsletter />
                        </Content>
                        {/* TODO: scroll-spy */}
                        {/*<ASideRight>
                                <Section>
                                        <div class="card">
                                                <div class="elevation elevation_depth_1"></div>
                                                <div class="card__text">
                                                        <div class="card__header">
                                                                <div class="section-about__overline">
                                                                        hey, my
                                                                        name is
                                                                </div>
                                                                <div class="section-about__overline">
                                                                        kirill
                                                                        morozov
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </Section>
                        </ASideRight>*/}
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
