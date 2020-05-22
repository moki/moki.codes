import { h } from "preact";
import { useEffect } from "preact/hooks";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Main } from "src/components/main";
import { Section } from "src/components/section";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { SectionCode } from "./section-code";

export function Code() {
        const animatePosY = Animation(decfn, 250, 0);
        const animateOpacity = Animation(decfn, 250, 0);
        const styles =
                `opacity: ${1 * animateOpacity};` +
                `transform: translateY(${32 - animatePosY * 32}px);`;
        useEffect(() => {
                if (animatePosY === 1) window.scrollTo(0, 0);
        });

        return (
                <Main classes="grid container container_code" style={styles}>
                        <Content>
                                <SectionCode />
                        </Content>
                </Main>
        );
}

Promise.all(
        [
                import("src/components/card/styles.css"),
                import("src/components/container/styles.css"),
                import("src/components/section/styles.css"),
                import("src/pages/code/content.css"),
                import("src/pages/code/styles.css"),
                import("src/pages/code/section-code.css")
        ].map(resolveDefault)
).then(insertStyles);
