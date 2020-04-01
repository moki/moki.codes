import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";
import { InfoHeading } from "./info-heading";

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
                        "Core features of propositional and predicate logic. Applications in CS, engineering, math.",
                subscript: {
                        left: "2014",
                        right: "The University of Melbourne"
                }
        }
];

export const Education = ({ classes }: { classes?: string }) => (
        <div class={`${classes}`}>
                <InfoHeading id="education">education</InfoHeading>
                {education.map(e => (
                        <InfoCard content={e} />
                ))}
        </div>
);
