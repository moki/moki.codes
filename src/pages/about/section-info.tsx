import { h } from "preact";
import { useContext } from "preact/hooks";

import { Section } from "src/components/section";
import {
        InfoBlockContainer,
        InfoBlock,
        InfoBlockHeader,
        InfoBlockItem
} from "./info-block";
import { Button } from "src/components/button";
import { copyToClipboard } from "src/components/copy-to-clipboard";

import { SnackbarContext, Snackbar } from "src/components/snackbar";

const education = [
        {
                title: "Specialist in Engineering",
                subtitle: "Moscow State University of Mechanical Engineering",
                body: ""
        },
        {
                title: "FP101x",
                subtitle: "Delft University of Technology",
                body:
                        "Foundations of functional programming\
                                and its real world application using Haskell."
        },
        {
                title: "Logic — Language and Information",
                subtitle: "The University of Melbourne",
                body:
                        "Core features of propositional and predicate logic.\
                                Applications in CS, engineering, math."
        }
];

const workexp = [
        {
                title: "Independent Contractor",
                subtitle: "Software Engineer",
                body:
                        "Full stack web services for the wide range of companies:\
                                from small buisnesses to startups."
        },
        {
                title: "Sberbank Technology",
                subtitle: "Software Engineer",
                body:
                        "Built new and improved performance of the already\
                                existing internal services."
        }
];

function Contacts() {
        const { addSnack } = useContext(SnackbarContext);
        const emailmixin = {
                onClick: (e: Event) => {
                        e.preventDefault();
                        copyToClipboard("morozov.kirill.moki@gmail.com");
                        const snack: Snackbar = {
                                message: "email copied to the clipboard",
                                type: "default"
                        };
                        addSnack(snack);
                }
        };
        const id = "contacts";
        const headermixin = {
                id,
                onClick: (e: Event) => {
                        e.preventDefault();
                        window.location.hash = `#${id}`;
                }
        };
        return (
                <InfoBlock>
                        <InfoBlockHeader {...headermixin}>
                                contacts
                        </InfoBlockHeader>
                        <Button
                                appearance="outlined"
                                classes="info-block-contacts__item"
                                {...emailmixin}
                        >
                                <div class="info-block-contacts__item-text">
                                        morozov.kirill.moki@gmail.com
                                </div>
                        </Button>
                        <Button
                                appearance="outlined"
                                classes="info-block-contacts__item"
                                href="https://t.me/mokicodes"
                                target="_blank"
                                rel="noopener"
                        >
                                <div class="info-block-contacts__item-text">
                                        t.me/mokicodes
                                </div>
                        </Button>
                </InfoBlock>
        );
}

function Socials() {
        const id = "socials";
        const mixin = {
                id,
                onClick: (e: Event) => {
                        e.preventDefault();
                        window.location.hash = `#${id}`;
                }
        };
        return (
                <InfoBlock>
                        <InfoBlockHeader {...mixin}>socials</InfoBlockHeader>
                        <Button
                                appearance="outlined"
                                classes="info-block-contacts__item"
                                href="https://github.com/moki"
                                target="_blank"
                                rel="noopener"
                        >
                                <div class="info-block-contacts__item-text">
                                        github.com/moki
                                </div>
                        </Button>
                        <Button
                                appearance="outlined"
                                classes="info-block-contacts__item"
                                href="https://twitter.com/mokicodes"
                                target="_blank"
                                rel="noopener"
                        >
                                <div class="info-block-contacts__item-text">
                                        twitter.com/mokicodes
                                </div>
                        </Button>
                </InfoBlock>
        );
}

export function SectionInfo() {
        return (
                <Section classes="section-about">
                        <div class="section-about__left">
                                <InfoBlockContainer
                                        title="work experience"
                                        items={workexp}
                                />
                                <InfoBlockContainer
                                        title="education"
                                        items={education}
                                />
                        </div>
                        <div class="section-about__right">
                                <Contacts />
                                <Socials />
                        </div>
                </Section>
        );
}
