import { h, Fragment } from "../../../lib/h";

const jobs = [
        {
                employer: "Independent Contractor",
                title: "Software Engineer",
                highlights:
                        "Providing full stack web services for the wide range of companies: from small buisnesses to startups.",
                date: "2014 — Present",
                location: "International"
        },
        {
                employer: "Sberbank Technology",
                title: "Software Engineer",
                highlights:
                        "Built new and improved performance of the already existed internal services.",
                date: "2013 — 2014",
                location: "Moscow, Russia"
        }
];

const Header = ({ children }: { children?: any }) => (
        <h2 class="text text_size_xl text_style_small-caps info-work__header">
                {children}
        </h2>
);

const Job = ({ job }: { job: { [key: string]: string } }) => {
        const jobClasses =
                "card info-card info-work__job elevation elevation_depth_2";
        const titleClasses =
                "info-card__title text text_size_l text_weight_medium";
        const subtitleClasses =
                "info-card__subtitle text text_size_m text_style_small-caps";
        const bodyClasses =
                "info-card__body text text_size_m text_weight_regular";
        const subscriptClases =
                "info-card__subscript text text_size_s text_weight_medium text_style_small-caps";
        return (
                <div class={jobClasses}>
                        <h3 class={titleClasses}>{job.employer}</h3>
                        <h4 class={subtitleClasses}>{job.title}</h4>
                        <p class={bodyClasses}>{job.highlights}</p>
                        <div class="info-card__footer">
                                <h5 class={subscriptClases}>{job.date}</h5>
                                <h5 class={subscriptClases}>{job.location}</h5>
                        </div>
                </div>
        );
};

export const Work = ({ classes }: { classes?: string }) => (
        <div class={`info-work ${classes}`}>
                <Header>work experience</Header>
                {jobs.map(e => (
                        <Job job={e} />
                ))}
        </div>
);
