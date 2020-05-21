export function copyToClipboard(v: any) {
        const fakeinput = document.createElement("input");
        fakeinput.setAttribute(
                "style",
                "position:absolute; left:0; bottom: 0; width: 100%; height: 100%"
        );
        fakeinput.setAttribute("value", v);
        document.body.appendChild(fakeinput);
        fakeinput.select();
        document.execCommand("copy");
        fakeinput.blur();
        document.body.removeChild(fakeinput);
}
