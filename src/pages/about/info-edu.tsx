import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";

const education = [
        {
                title: "Specialist in Engineering",
                subtitle: "Moscow State University of Mechanical Engineering",
                body: "",
                subscript: {
                        left: "2009 — 2014",
                        right: "Moscow, Russia"
                }
        },
        {
                subtitle: "Introduction to Functional Programming",
                title: "FP101x",
                body:
                        "Foundations of functional programming and its real world application using Haskell.",
                subscript: {
                        left: "2015",
                        right: "Delft University of Technology"
                }
        },
        {
                title: "Logic",
                subtitle: "Language and Information",
                body:
                        "Core features of propositional and predicate logic. Applications in CS, Engineering, math.",
                subscript: {
                        left: "2014",
                        right: "The University of Melbourne"
                }
        }
];

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_xl text_style_small-caps info__header">
                {children}
        </h2>
);

export const Education = ({ classes }: { classes?: string }) => (
        <div class={`info-work ${classes}`}>
                <Header>education</Header>
                {education.map(e => (
                        <InfoCard content={e} />
                ))}
        </div>
);
