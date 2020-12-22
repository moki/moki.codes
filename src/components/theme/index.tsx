import { useState } from "preact/hooks";

const LIGHT = false;
const DARK = true;

export function Theme(initialColor: boolean = LIGHT) {
        const initialThemeColor =
                window.localStorage.getItem("theme-color") !== null
                        ? window.localStorage.getItem("theme-color") === "true"
                        : LIGHT;

        const [color, setColor] = useState(initialThemeColor);

        let classes = [
                "theme",
                "theme_typography",
                `theme_color_${color ? "dark" : "light"}`
        ];

        const toggleColor = (e: any) => {
                classes = [
                        ...classes,
                        `theme_color_${color ? "light" : "dark"}`
                ];
                setColor(!color);
                window.localStorage.setItem("theme-color", "" + !color);
        };

        return {
                color,
                toggleColor,
                classes
        };
}
