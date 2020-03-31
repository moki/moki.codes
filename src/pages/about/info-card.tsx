import { h, Fragment } from "../../../lib/h";

export type InfoCardContent = {
        title: string;
        subtitle: string;
        body: string;
        subscript: {
                left: string;
                right: string;
        };
};

export const InfoCard = ({ content }: { content: InfoCardContent }) => {
        const cardClasses =
                "card info-card info-work__job elevation elevation_depth_2";
        const titleClasses =
                "info-card__title text text_size_l text_weight_regular";
        const subtitleClasses =
                "info-card__subtitle text text_size_m text_style_small-caps";
        const bodyClasses =
                "info-card__body text text_size_m text_weight_regular";
        const subscriptClases =
                "info-card__subscript text text_size_s text_weight_medium text_style_small-caps";
        return (
                <div class={cardClasses}>
                        <h3 class={titleClasses}>{content.title}</h3>
                        <h4 class={subtitleClasses}>{content.subtitle}</h4>
                        <p class={bodyClasses}>{content.body}</p>
                        <div class="info-card__footer">
                                <h5 class={subscriptClases}>
                                        {content.subscript.left}
                                </h5>
                                <h5 class={subscriptClases}>
                                        {content.subscript.right}
                                </h5>
                        </div>
                </div>
        );
};
