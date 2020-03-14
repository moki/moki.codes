import "@moki.codes/mokui-theme/dist/mokui-theme.css";
import "@moki.codes/mokui-layout/dist/mokui-layout.css";
import "@moki.codes/mokui-elevation/dist/mokui-elevation.css";
import "@moki.codes/mokui-animation/dist/mokui-animation.css";
import "@moki.codes/mokui-header/dist/mokui-header.css";
import "@moki.codes/mokui-text/dist/mokui-text.css";
import "@moki.codes/mokui-drawer/dist/mokui-drawer.css";
import "@moki.codes/mokui-list/dist/mokui-list.css";
import "@moki.codes/mokui-tabs/dist/mokui-tabs.css";
import "@moki.codes/mokui-link/dist/mokui-link.css";

import { Header } from "@moki.codes/mokui-header";
import { Theme, strings as themeStrings } from "@moki.codes/mokui-theme";
import { Drawer } from "@moki.codes/mokui-drawer";
import { List } from "@moki.codes/mokui-list";
import { Tabs } from "@moki.codes/mokui-tabs";

/* global(layout) styles */
import "./components/footer/styles.css";
import "./components/drawer/styles.css";
import "./components/header/styles.css";

let header: any, theme: any, leftNav: any, drawerList: any, headerTabs: any;
let themeElement: Element;

const state: {
        themeColor: boolean;
} = {
        themeColor: false
};

const themeLight = "theme_color_light";
const themeDark = "theme_color_dark";

const themeSetClass = () => {
        if (state.themeColor) {
                themeElement.classList.remove(themeLight);
                themeElement.classList.add(themeDark);
        } else {
                themeElement.classList.remove(themeDark);
                themeElement.classList.add(themeLight);
        }
};

const themeToggleHandler = () => {
        state.themeColor = !state.themeColor;
        window.localStorage.setItem("state_themeColor", "" + state.themeColor);

        themeSetClass();
};

const loadHandler = () => {
        /* init components */
        const headerElement = document.querySelector(".layout__header")!;
        const drawerListElement = document.querySelector("#drawer-list")!;
        const leftNavElement = document.querySelector(".layout__aside-left")!;
        /* const headerTabsElement = document.querySelector(".header__navigation");*/
        themeElement = document.querySelector(".theme")!;

        header = Header(headerElement);
        drawerList = List(drawerListElement);
        leftNav = Drawer(leftNavElement);
        /* headerTabs = Tabs(headerElement); */
        theme = Theme(themeElement);

        window.addEventListener(
                themeStrings.THEME_TOGGLE_EVENT,
                themeToggleHandler
        );

        /* init theme state */
        const storageTheme = window.localStorage.getItem("state_themeColor");
        state.themeColor =
                storageTheme === null
                        ? themeElement.classList.contains(themeDark)
                        : storageTheme === "true";

        themeSetClass();

        /* display */
        const body = document.body;
        body.setAttribute("style", "display: grid;");
};

const unloadHandler = () => {
        header.destroy();
        theme.destroy();
        leftNav.destroy();
        drawerList.destroy();

        window.removeEventListener(
                themeStrings.THEME_TOGGLE_EVENT,
                themeToggleHandler
        );

        window.localStorage.setItem("bye", "" + state.themeColor);
};

window.addEventListener("load", loadHandler);

window.addEventListener("unload", unloadHandler);
