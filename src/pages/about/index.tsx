import { List, strings } from "@moki.codes/mokui-list";
/*import { VIRTUAL_DOM_RENDER_FINISH } from "../../../lib/render";*/

import "@moki.codes/mokui-card/dist/mokui-card.css";
import "@moki.codes/mokui-list/dist/mokui-list.css";

import { Snackbar } from "../../components/snackbar";

import "../../components/separator/styles.css";
import "../../components/section/styles.css";
import "../../components/snackbar/styles.css";

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
let emailId: string;

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

        Snackbar({
                message: "email copied to the clipboard",
                timeout: 3000,
                hidems: 350
        });
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
                window.addEventListener("load", load);
                window.addEventListener("unload", unload);
        }
} else {
        window.addEventListener("load", load);
        window.addEventListener("unload", unload);
}
