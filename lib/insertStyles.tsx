export function insertStyles(styles: string[] | string) {
        document.head.innerHTML += (!Array.isArray(styles) ? [styles] : styles)
                .map(e => "<style>" + e + "</style>")
                .reduce((p, n) => (p += n), "");
}
