import { h } from "preact";
import { useEffect } from "preact/hooks";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Card, CardHeader, CardBody, CardActions } from "src/components/card";
import { Main } from "src/components/main";
import { Section } from "src/components/section";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { SectionIntro } from "./section-intro";
import { SectionInfo } from "./section-info";

export function About() {
        const animatePosY = Animation(decfn, 250, 0);
        const animateOpacity = Animation(decfn, 250, 0);
        const styles =
                `opacity: ${1 * animateOpacity};` +
                `transform: translateY(${32 - animatePosY * 32}px);`;

        useEffect(() => {
                if (animatePosY === 1) {
                        if (window.location.hash) {
                                const hashel = document.querySelector(
                                        window.location.hash
                                );
                                if (hashel) hashel.scrollIntoView();
                        } else {
                                window.scrollTo(0, 0);
                        }
                }
        }, []);

        return (
                <Main classes="grid container container_about" style={styles}>
                        <Content>
                                <Section>
                                        <Card elevation={1}>
                                                <SectionIntro />
                                                <SectionInfo />
                                        </Card>
                                </Section>
                        </Content>
                </Main>
        );
}

Promise.all(
        [
                import("src/components/card/styles.css"),
                import("src/components/container/styles.css"),
                import("src/components/button/styles.css"),
                import("src/components/elevation/styles.css"),
                import("src/components/section/styles.css"),
                import("src/pages/about/content.css"),
                import("src/pages/about/styles.css"),
                import("src/pages/about/section-intro.css"),
                import("src/pages/about/section-info.css"),
                import("src/pages/about/info-block.css")
        ].map(resolveDefault)
).then(insertStyles);
