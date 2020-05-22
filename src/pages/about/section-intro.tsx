import { h } from "preact";
import { Section } from "src/components/section";

export function SectionIntro() {
        return (
                <Section classes="section-about section-intro">
                        <div class="section-about__headshot"></div>
                        <div class="section-about__intro-text">
                                <h1 class="section-about__intro-title">
                                        kirill morozov
                                </h1>
                                <h2 class="section-about__intro-subtitle">
                                        Software Engineer with passion for web
                                        and systems programming.
                                </h2>
                        </div>
                </Section>
        );
}
