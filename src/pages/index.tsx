import "@moki.codes/mokui-card/dist/mokui-card.css";
import "@moki.codes/mokui-button/dist/mokui-button.css";

import { TextField, strings } from "../components/textfield";

import "../components/section/styles.css";
import "../components/article-preview/styles.css";
import "../components/textfield/styles.css";

import "./styles.css";
import "./section-hero.css";
import "./section-articles.css";
import "./section-code.css";
import "./section-subscribe.css";

let nameField: TextField;
let emailField: TextField;
let formSubmit: Element | null;
let form: Element | null;
let kitty: Element | null;

let state = {
        isKittyTyping: false,
        formDirty: false
};

const stateValidChanged = (e: Event) => {
        if (emailField.valid && nameField.valid) {
                formSubmit!.classList.remove("button_disabled");
                form!.classList.add("section-subscribe__form_valid");
                form!.classList.remove("section-subscribe__form_invalid");
        } else {
                formSubmit!.classList.add("button_disabled");
                form!.classList.add("section-subscribe__form_invalid");
                form!.classList.remove("section-subscribe__form_valid");
        }
};

const formFocusinHandler = (e: Event) => {
        const element = e.target! as HTMLInputElement;
        if (element !== nameField.input && element !== emailField.input) return;
        state.isKittyTyping = true;
        kitty!.classList.add("kitty_types");
};

const formFocusoutHandler = (e: Event) => {
        const element = e.target! as HTMLInputElement;
        if (element !== nameField.input && element !== emailField.input) return;
        state.isKittyTyping = false;
        kitty!.classList.remove("kitty_types");
};

const formInputHandler = (e: Event) => {
        const element = e.target! as HTMLInputElement;
        if (element !== nameField.input && element !== emailField.input) return;
        if (state.formDirty) return;
        state.formDirty = true;
        stateValidChanged(e);
};

export const load = () => {
        nameField = TextField({
                id: "name",
                type: "text",
                labelSelectedClasses: ["elevation", "elevation_depth_2"]
        });

        emailField = TextField({
                id: "email",
                type: "email",
                labelSelectedClasses: ["elevation", "elevation_depth_2"]
        });

        formSubmit = document.querySelector(".section-subscribe-form__submit");
        if (!formSubmit) throw new Error("didn't find form submit button");

        form = document.querySelector("#subform");
        if (!form) throw new Error("didn't find form title");

        kitty = document.querySelector(".kitty");
        if (!kitty) throw new Error("didn't find kitty");

        window.addEventListener(
                strings.STATE_VALID_CHANGED_EVENT,
                stateValidChanged
        );

        window.addEventListener("focusin", formFocusinHandler);
        window.addEventListener("focusout", formFocusoutHandler);
        window.addEventListener("input", formInputHandler);
};

export const unload = () => {
        nameField.destroy();
        emailField.destroy();
        window.removeEventListener(
                strings.STATE_VALID_CHANGED_EVENT,
                stateValidChanged
        );
        window.removeEventListener("focusin", formFocusinHandler);
        window.removeEventListener("focusout", formFocusoutHandler);
};

if (process.env.NODE_ENV === "development") {
        if (window.location.pathname === "/") {
                window.addEventListener("load", load);
                window.addEventListener("unload", unload);
        }
} else {
        window.addEventListener("load", load);
        window.addEventListener("unload", unload);
}
