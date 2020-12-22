import { h } from "preact";
import { Section } from "src/components/section";
import { ArticleContainer } from "src/containers/article";

/* section */
export function SectionArticle() {
        return (
                <Section>
                        <ArticleContainer endpoint="/api/posts" />
                </Section>
        );
}
