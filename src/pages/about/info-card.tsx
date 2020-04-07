import { h, Fragment } from "../../../lib/h";

export type InfoCardContent = {
        title: string;
        subtitle: string;
        body?: string;
        subscript: {
                left: string;
                right: string;
        };
};

export const InfoCard = ({ content }: { content: InfoCardContent }) => {
        const cardClasses = "card info-card elevation elevation_depth_2";
        const titleClasses =
                "info-card__title text_line-height_s text_size_m text_weight_medium";
        const subtitleClasses =
                "info-card__subtitle text_line-height_s text_size_s text_style_small-caps text_letter-spacing_m text_weight_bold";
        const bodyClasses =
                "info-card__body text_line-height_s text_size_s text_weight_regular text_length_m";
        const subscriptClases =
                "info-card__subscript text_line-height_s text_size_s text_weight_bold text_style_small-caps text_letter-spacing_m";
        return (
                <div class={cardClasses}>
                        <h3 class={titleClasses}>{content.title}</h3>
                        <h4 class={subtitleClasses}>{content.subtitle}</h4>
                        {content.body && (
                                <p class={bodyClasses}>{content.body}</p>
                        )}
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
