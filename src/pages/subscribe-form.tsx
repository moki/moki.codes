import { h, Fragment } from "../../lib/h";

import { ButtonGhost } from "../components/button";
import { TextField, strings } from "../components/textfield";

const TextFieldTemplate = ({
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
        const formClasses = "subscribe-form";
        return (
                <form class={formClasses} id={id} autocomplete={autocomplete}>
                        {children}
                </form>
        );
};

const FormTitle = ({ children }: { children?: any }) => {
        const classes =
                "text_line-height_m text_size_xl text_weight_medium subscribe-form__title kitty";
        return <div class={classes}>{children}</div>;
};

const FormSubmit = ({ children }: { children?: any }) => {
        const classes = "subscribe-form__submit-wrapper";
        return <div class={classes}>{children}</div>;
};

export const SubscribeFormTemplate = ({ elevation }: { elevation: number }) => {
        const submitClasses =
                "text_line-height_m text_style_small-caps text_letter-spacing_m " +
                "text_size_m text_weight_medium subscribe-form__submit button_disabled";
        return (
                <Form id="subform" autocomplete="off">
                        <FormTitle>
                                <span class="kitty__paw-left">つ</span>
                                &#8291; &#8291; &#8291; &#8291; ^•ﻌ•^
                                <span class="kitty__paw-right">つ</span>
                        </FormTitle>
                        <TextFieldTemplate
                                type="text"
                                id="name"
                                label="name"
                                elevation={1}
                        />
                        <TextFieldTemplate
                                type="email"
                                id="email"
                                label="email"
                                elevation={1}
                        />
                        <FormSubmit>
                                <ButtonGhost
                                        size="l"
                                        color="primary-light"
                                        elevation={1}
                                        classes={submitClasses}
                                >
                                        Subscribe
                                </ButtonGhost>
                        </FormSubmit>
                </Form>
        );
};

const init = Symbol("init");

export type SubscribeForm = {
        id: string;
        root: Element;
        submit: Element;
        kitty: Element;
        fields: TextField[];
        isKittyTyping: boolean;
        formDirty: boolean;
        focusinHandler: EventListener;
        focusoutHandler: EventListener;
        inputHandler: EventListener;
        isValidEvent(this: SubscribeForm, e: Event): boolean;
        validnessChange(this: SubscribeForm, e: Event): void;
        destroy(): void;
};

function validnessChange(this: SubscribeForm, e: Event) {
        let valid = true;
        let i = this.fields.length;
        for (; i--; ) if (!(valid = valid && this.fields[i].valid)) break;
        if (valid) {
                this.submit.classList.remove("button_disabled");
                this.root.classList.add("subscribe-form_valid");
                this.root.classList.remove("subscribe-form_invalid");
        } else {
                this.submit.classList.add("button_disabled");
                this.root.classList.add("subscribe-form_invalid");
                this.root.classList.remove("subscribe-form_valid");
        }
}

function handleFocusin(this: SubscribeForm, e: Event) {
        if (!this.isValidEvent(e)) return;
        this.isKittyTyping = true;
        this.kitty.classList.add("kitty_types");
}

function handleFocusout(this: SubscribeForm, e: Event) {
        if (!this.isValidEvent(e)) return;
        this.isKittyTyping = false;
        this.kitty.classList.remove("kitty_types");
}

function handleInput(this: SubscribeForm, e: Event) {
        const element = e.target! as HTMLInputElement;
        if (!this.isValidEvent(e)) return;
        if (this.formDirty) return;
        this.formDirty = true;
        this.validnessChange(e);
}

function isValidEvent(this: SubscribeForm, e: Event): boolean {
        const element = e.target! as HTMLInputElement;
        if (!element) return false;
        if (element.form && element.form.id !== this.id) return false;
        let i = this.fields.length;
        for (; i--; ) if (this.fields[i].input === element) return true;

        return false;
}

export const SubscribeForm = ({
        id,
        fields,
        submit,
        kitty
}: {
        id: string;
        fields: TextField[];
        submit: Element;
        kitty: Element;
}) => {
        function _init(this: SubscribeForm) {
                const root = document.querySelector(`#${id}`);
                if (!root) throw new Error("Failed to init SubscribeForm");
                this.root = root;

                this.isValidEvent = isValidEvent.bind(this);
                this.validnessChange = validnessChange.bind(this);

                this.focusinHandler = handleFocusin.bind(this);
                this.focusoutHandler = handleFocusout.bind(this);
                this.inputHandler = handleInput.bind(this);

                window.addEventListener(
                        strings.STATE_VALID_CHANGED_EVENT,
                        this.validnessChange
                );

                window.addEventListener("focusin", this.focusinHandler);
                window.addEventListener("focusout", this.focusoutHandler);
                window.addEventListener("input", this.inputHandler);
        }

        function destroy(this: SubscribeForm) {
                window.removeEventListener("focusin", this.focusinHandler);
                window.removeEventListener("focusout", this.focusoutHandler);
                window.removeEventListener("input", this.inputHandler);
        }

        const self = {
                id,
                root: (null as unknown) as Element,
                fields,
                submit,
                kitty,
                isKittyTyping: false,
                formDirty: false,
                [init]: _init,
                focusinHandler: (null as unknown) as EventListener,
                focusoutHandler: (null as unknown) as EventListener,
                inputHandler: (null as unknown) as EventListener,
                isValidEvent: (null as unknown) as (
                        this: SubscribeForm,
                        e: Event
                ) => boolean,
                validnessChange: (null as unknown) as (
                        this: SubscribeForm,
                        e: Event
                ) => void,
                destroy
        };

        self[init]();
        return self;
};