import { h } from "preact";
import { Card, CardHeader, CardBody } from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { handleClick } from "src/components/router-link";

const Title = <div class="section-notfound__title">404</div>;
const Subtitle = <div class="section-notfound__subtitle">not found</div>;

const peeking = `\
   *       .     *     _        .
.               *    .    *             . 
   * *          page    *        * 
   *** ***     ⊂_ヽ            ¯\_(ツ)_/¯ 
     * * * * * 　 ＼＼ not       
  .    *** *** 　　 ＼( ͡° ͜ʖ ͡°)   
             * 　　　 >　⌒ヽ  .           .
　⠀ ∩　             / 　 へ＼
　＼＼　 .          /　　/　＼＼found
／ ）              ﾚ　 ノ　　 ヽ_つ    *
 ⊂＼＿／￣￣￣\    /　/
　＼＿／ ° ͜ʖ °    /　/|         ¯\_(ツ)_/¯
 ） ／⌒＼       (　(ヽ
／ ＿＿＿／⌒＼⊃  |　|、＼404    .
（ ／            | 丿 ＼ ⌒)
＼＼             | |　　) /        
U               ノ )　　Lﾉ           (´ε｀ )
 ∩      .       (_／#boiiii
                  .     *     _        .
   *       *                    *
.               *    .    *             .
`;

export function SectionNotfound() {
        return (
                <Section>
                        <Card elevation={1} classes="section-notfound__card">
                                <CardHeader
                                        classes="section-notfound__header"
                                        elevation={1}
                                >
                                        {Title}
                                        {Subtitle}
                                </CardHeader>
                                <CardBody classes="section-notfound__body">
                                        <pre class="section-notfound__message">
                                                {peeking}
                                        </pre>
                                </CardBody>
                        </Card>
                </Section>
        );
}
