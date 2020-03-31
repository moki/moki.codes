import { h, Fragment } from "../../../lib/h";
import { InfoCard } from "./info-card";

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

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_xl text_style_small-caps info__header">
                {children}
        </h2>
);

export const Work = ({ classes }: { classes?: string }) => (
        <div class={`info-work ${classes}`}>
                <Header>work experience</Header>
                {jobs.map(e => (
                        <InfoCard content={e} />
                ))}
        </div>
);
