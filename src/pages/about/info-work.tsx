import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";
import { InfoHeading } from "./info-heading";

const jobs = [
        {
                title: "Independent Contractor",
                subtitle: "Software Engineer",
                body:
                        "Full stack web services for the wide range of companies: from small buisnesses to startups.",
                subscript: {
                        left: "2014 — Present",
                        right: "International"
                }
        },
        {
                title: "Sberbank Technology",
                subtitle: "Software Engineer",
                body:
                        "Built new and improved performance of the already existed internal services.",
                subscript: {
                        left: "2013 — 2014",
                        right: "Moscow, Russia"
                }
        }
];

export const Work = ({ classes }: { classes?: string }) => (
        <div class={`${classes}`}>
                <InfoHeading id="work-experience">work experience</InfoHeading>
                {jobs.map(e => (
                        <InfoCard content={e} />
                ))}
        </div>
);
