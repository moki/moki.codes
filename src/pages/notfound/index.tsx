import { h } from "preact";
import { useEffect } from "preact/hooks";

import { insertStyles } from "lib/insertStyles";
import { resolveDefault } from "lib/resolveDefault";

import { decfn } from "src/animation-functions";

import { Main } from "src/components/main";
import { Section } from "src/components/section";
import { Animation } from "src/components/animation";

import { Content } from "./content";
import { SectionNotfound } from "./section-notfound";

export function Notfound() {
        const animatePosY = Animation(decfn, 250, 0);
        const animateOpacity = Animation(decfn, 250, 0);
        const styles =
                `opacity: ${1 * animateOpacity};` +
                `transform: translateY(${32 - animatePosY * 32}px);`;
        useEffect(() => {
                if (animatePosY === 1) window.scrollTo(0, 0);
        }, []);

        return (
                <Main
                        classes="grid container container_notfound"
                        style={styles}
                >
                        <Content>
                                <SectionNotfound />
                        </Content>
                </Main>
        );
}

Promise.all(
        [
                import("src/components/card/styles.css"),
                import("src/components/container/styles.css"),
                import("src/components/section/styles.css"),
                import("src/components/elevation/styles.css"),
                import("src/pages/notfound/content.css"),
                import("src/pages/notfound/styles.css"),
                import("src/pages/notfound/section-notfound.css")
        ].map(resolveDefault)
).then(insertStyles);
