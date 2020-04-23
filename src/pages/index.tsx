import "@moki.codes/mokui-card/dist/mokui-card.css";
import "@moki.codes/mokui-button/dist/mokui-button.css";

import { TextField, strings } from "../components/textfield";
import { SubscribeForm } from "./subscribe-form";
import { Snackbar } from "../components/snackbar";

import "../components/section/styles.css";
import "../components/article-preview/styles.css";
import "../components/textfield/styles.css";
import "../components/snackbar/styles.css";

import "./section-hero.css";
import "./section-articles.css";
import "./section-code.css";
import "./section-subscribe.css";
import "./subscribe-form.css";

let nameField: TextField;
let emailField: TextField;
let subform: SubscribeForm;

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

        const submit = document.querySelector(".subscribe-form__submit");
        if (!submit) throw new Error("Failed");
        const kitty = document.querySelector(".kitty");
        if (!kitty) throw new Error("Failed");

        subform = SubscribeForm({
                id: "subform",
                fields: [nameField, emailField],
                submit,
                submiturl: `${(window as any).API}/newsletter/subscribers`,
                kitty,
                Snackbar
        });
};

export const unload = () => {
        nameField.destroy();
        emailField.destroy();
        subform.destroy();
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
