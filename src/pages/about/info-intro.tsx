import { h, Fragment } from "../../../lib/h";

const Header = ({ children }: { children?: any }) => (
        <h2 class="text_size_xl text_style_small-caps text_letter-spacing_m text_line-height_m text_weight_xbold info-intro__header">
                {children}
        </h2>
);

const Legend = ({ children }: { children?: any }) => (
        <p class="text_line-height_s text_size_m text_length_m text_weight_regular">
                {children}
        </p>
);

export const Intro = ({ classes }: { classes?: string }) => (
        <div class={`info-intro ${classes}`}>
                <img
                        class="info-intro__media elevation elevation_depth_2"
                        src="https://i.imgur.com/IdSXMe4.jpg"
                        alt="kirill morozov headshot"
                />
                <div class="info-intro__text">
                        <Header>Kirill Morozov</Header>
                        <Legend>
                                Software Engineer with passion for web and
                                system programming.
                        </Legend>
                </div>
        </div>
);
