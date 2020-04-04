import { List, strings } from "@moki.codes/mokui-list";
import { VIRTUAL_DOM_RENDER_FINISH } from "../../../lib/render";

import "@moki.codes/mokui-card/dist/mokui-card.css";
import "@moki.codes/mokui-list/dist/mokui-list.css";

import "../../components/separator/styles.css";
import "../../components/section/styles.css";

import "./styles.css";
import "./section-hero.css";
import "./section-info.css";
import "./info-heading.css";
import "./info-card.css";
import "./info-intro.css";
import "./info-work.css";
import "./info-edu.css";
import "./info-contacts.css";

let contactsList: any;
let socialsList: any;
let snackbar: Element | null;
let emailId: string;

function Snackbar() {
        if (snackbar) return;
        snackbar = document.createElement("div");
        const snackbarClasses = ["snackbar"];
        snackbar.classList.add(...snackbarClasses);

        const container = document.createElement("div");
        const containerClasses = ["snackbar__container"];
        container.classList.add(...containerClasses);

        const content = document.createElement("div");
        const contentClasses = [
                "snackbar__content",
                "elevation",
                "elevation_depth_6"
        ];
        content.classList.add(...contentClasses);

        const text = document.createElement("div");
        const textClasses = [
                "text",
                "text_size_s",
                "text_weight_medium",
                "text_style_small-caps"
        ];
        text.classList.add(...textClasses);
        text.innerHTML = "email copied to the clipboard";

        const action = document.createElement("div");
        const actionClasses = ["snackbar__action"];
        action.classList.add(...actionClasses);
        action.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

        const close = action.querySelector("svg");
        if (!close) return;

        let tick = false;
        let target = 200;
        let animating = false;
        let start: number;

        function closeTick() {
                requestAnimationFrame(closeAnimation);
                tick = true;
        }

        function closeAnimation(time: number) {
                let fraction = (time - start) / 300;
                fraction = fraction > 1 ? 1 : fraction;
                let progress = 1 - Math.sin(Math.acos(fraction));
                snackbar!.setAttribute(
                        "style",
                        `transform: translate(-50%, ${target * progress}%);
                                `
                );

                if (fraction < 1) closeTick();
                else {
                        document.body.removeChild(snackbar!);
                        snackbar = null;
                }
        }

        close.addEventListener("click", e => {
                animating = true;
                start = performance.now();
                closeTick();
        });

        content.appendChild(text);
        content.appendChild(action);
        container.appendChild(content);
        snackbar.appendChild(container);
        document.body.appendChild(snackbar);

        setTimeout(() => {
                if (animating) return;
                start = performance.now();
                closeTick();
        }, 3000);
}

const copyMail = (e: Event) => {
        const element = e.target as Element;
        if (element.id !== "contacts-direct") return;
        const lis = element.querySelectorAll("li");
        const clickIdx = (e as CustomEvent).detail.index;
        if (lis[clickIdx].id !== emailId) return;
        const litext = lis[clickIdx].querySelector(".info-list__text");
        if (!litext) return;

        const fakeinput = document.createElement("input");
        fakeinput.setAttribute(
                "style",
                "position:absolute; left:0; bottom: 0; width: 100%; height: 100%"
        );
        fakeinput.setAttribute("value", litext.innerHTML);
        element.appendChild(fakeinput);
        fakeinput.select();
        document.execCommand("copy");
        fakeinput.blur();
        element.removeChild(fakeinput);

        Snackbar();
};

export const load = () => {
        const contactsListElement = document.querySelector("#contacts-direct")!;
        if (!contactsListElement) return;
        const socialsListElement = document.querySelector("#contacts-socials")!;
        if (!socialsListElement) return;

        contactsList = List(contactsListElement);
        socialsList = List(socialsListElement);

        const email = contactsListElement.querySelector("li:first-of-type");
        if (!email) return;
        emailId = email.id;

        window.addEventListener("mokui-list:list-item-clicked", copyMail);
};

export const unload = () => {
        window.removeEventListener("mokui-list:list-item-clicked", copyMail);
        contactsList.destroy();
        socialsList.destroy();
};

if (process.env.NODE_ENV === "development") {
        if (window.location.pathname === "/about") {
                window.addEventListener(VIRTUAL_DOM_RENDER_FINISH, load);
                window.addEventListener("unload", unload);
        }
} else {
        window.addEventListener("load", load);
        window.addEventListener("unload", unload);
}
