import { h, Fragment } from "../../lib/h";

import {
        Card,
        CardText,
        CardHeader,
        CardBody,
        CardFooter
} from "../components/card";
import { Container } from "../components/container";
import { Section } from "../components/section";
import { ButtonGhost } from "../components/button";

const Header = ({ children }: { children?: any }) => (
        <h2 class="text_line-height_xl text_size_4xl text_weight_xbold section-subscribe__title">
                {children}
        </h2>
);

const Subheader = ({ children }: { children?: any }) => (
        <h3 class="text_line-height_m text_size_l text_weight_medium section-subscribe__subtitle">
                {children}
        </h3>
);

const TextField = ({
        type,
        id,
        label,
        elevation
}: {
        type: string;
        id: string;
        label: string;
        elevation: number;
}) => {
        const inputClasses = `text-field__input text_line-height_m text_size_s text_weight_regular text_style_small-caps text_letter-spacing_m elevation elevation_depth_${elevation}`;
        const labelClasses =
                "text-field__label text_line-height_m text_size_s text_weight_regular text_style_small-caps text_letter-spacing_m";
        return (
                <div class="text-field">
                        <input type="text" id={id} class={inputClasses} />
                        <label for={id} class={labelClasses}>
                                {label}
                        </label>
                </div>
        );
};
const Form = ({
        id,
        autocomplete,
        children
}: {
        id: string;
        autocomplete: "on" | "off";
        children?: any;
}) => {
        const formClasses = "section-subscribe__form";
        return (
                <form class={formClasses} id={id} autocomplete={autocomplete}>
                        {children}
                </form>
        );
};

const FormTitle = ({ children }: { children?: any }) => {
        const classes =
                "text_line-height_m text_size_xl text_weight_medium section-subscribe-form__title kitty";
        return <div class={classes}>{children}</div>;
};

const FormSubmit = ({ children }: { children?: any }) => {
        const classes = "section-subscribe-form__submit-wrapper";
        return <div class={classes}>{children}</div>;
};

export const Subscribe = () => {
        const submitClasses =
                "text_line-height_m text_style_small-caps text_letter-spacing_m text_size_m text_weight_medium section-subscribe-form__submit button_disabled";
        return (
                <Section vpadding="l" classes="section-subscribe">
                        <Container classes="subscribe">
                                <Header>Stay Tuned</Header>
                                <Subheader>Subscribe for updates</Subheader>
                                <Card elevation={1}>
                                        <Form id="subform" autocomplete="off">
                                                <FormTitle>
                                                        <span class="kitty__paw-left">
                                                                つ
                                                        </span>
                                                        &#8291; &#8291; &#8291;
                                                        &#8291; ^•ﻌ•^
                                                        <span class="kitty__paw-right">
                                                                つ
                                                        </span>
                                                </FormTitle>
                                                <TextField
                                                        type="text"
                                                        id="name"
                                                        label="name"
                                                        elevation={2}
                                                />
                                                <TextField
                                                        type="email"
                                                        id="email"
                                                        label="email"
                                                        elevation={2}
                                                />
                                                <FormSubmit>
                                                        <ButtonGhost
                                                                size="l"
                                                                color="primary-light"
                                                                elevation={2}
                                                                classes={
                                                                        submitClasses
                                                                }
                                                        >
                                                                Subscribe
                                                        </ButtonGhost>
                                                </FormSubmit>
                                        </Form>
                                </Card>
                        </Container>
                </Section>
        );
};
