const init = Symbol("init");

const snackqueue: Snackbar[] = [];

let activeSnack: Snackbar | null = null;

const snackbar = document.createElement("div");
const snackbarClasses = ["snackbar"];
snackbar.classList.add(...snackbarClasses);

const container = document.createElement("div");
const containerClasses = ["snackbar__container"];
container.classList.add(...containerClasses);

const content = document.createElement("div");
const contentClasses = ["snackbar__content", "elevation", "elevation_depth_6"];
content.classList.add(...contentClasses);

const text = document.createElement("div");
const textClasses = [
        "text_line-height_m",
        "text_size_s",
        "text_weight_medium",
        "text_style_small-caps",
        "text_letter-spacing_m"
];
text.classList.add(...textClasses);

const action = document.createElement("div");
const actionClasses = ["snackbar__action"];
action.classList.add(...actionClasses);

const close = document.createElementNS("http://www.w3.org/2000/svg", "svg");
close.setAttribute("viewBox", "0 0 24 24");
close.setAttribute("width", "24px");
close.setAttribute("height", "24px");
const p0 = document.createElementNS("http://www.w3.org/2000/svg", "path");
p0.setAttribute(
        "d",
        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
);
const p1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
p1.setAttribute("d", "M0 0h24v24H0z");
p1.setAttribute("fill", "none");
close.appendChild(p0);
close.appendChild(p1);

content.appendChild(text);
action.appendChild(close);
content.appendChild(action);
container.appendChild(content);
snackbar.appendChild(container);

export type Snackbar = {
        root: HTMLElement;
        close: SVGElement;
        closeClickHandler: EventListener;
        hide(this: Snackbar): void;
        show(this: Snackbar): void;
        animating: boolean;
        tick: boolean;
        closeAnimation(this: Snackbar, time: number): void;
        closeTick(this: Snackbar): void;
        start: number;
        destroy(this: Snackbar): void;
};

export const Snackbar = ({
        message,
        timeout = 3000,
        hidems = 350,
        status
}: {
        message: string;
        timeout?: number;
        hidems?: number;
        status?: string;
}): Snackbar => {
        text.innerHTML = message;
        const root = snackbar.cloneNode(true) as HTMLElement;
        if (status) root.classList.add(`snackbar_${status}`);
        const target = 100;

        function handleCloseClick(this: Snackbar, e: Event) {
                this.hide();
        }

        function show(this: Snackbar) {
                if (!activeSnack) return;
                document.body.appendChild(activeSnack.root);
        }

        function hide(this: Snackbar) {
                if (!activeSnack) return;
                this.start = performance.now();
                activeSnack.closeTick();

                activeSnack = snackqueue.shift() as Snackbar;

                setTimeout(() => {
                        if (!activeSnack) return;
                        if (activeSnack.animating) return;
                        activeSnack.start = performance.now();
                        activeSnack.hide();
                }, timeout);

                if (!activeSnack) return;
                activeSnack.show();
        }

        function closeTick(this: Snackbar) {
                requestAnimationFrame(this.closeAnimation);
                this.tick = true;
        }

        function _closeAnimation(this: Snackbar, time: number) {
                let fr = (time - this.start) / hidems;
                fr = fr > 1 ? 1 : fr;
                let pg = 1 - Math.sin(Math.acos(fr));
                this.root.setAttribute(
                        "style",
                        `transform: translate(-50%, ${target * pg}%);
                                  `
                );
                if (fr < 1) this.closeTick();
                else this.destroy();
        }

        function _init(this: Snackbar) {
                this.closeClickHandler = handleCloseClick.bind(this);
                this.close = this.root.querySelector("svg") as SVGElement;
                if (!close) throw new Error("Failed to init snackbar");
                this.close.addEventListener("click", this.closeClickHandler);
                this.closeAnimation = _closeAnimation.bind(this);
                snackqueue.push(this);
                if (activeSnack) return;
                activeSnack = snackqueue.shift() as Snackbar;
                setTimeout(() => {
                        if (!activeSnack) return;
                        if (activeSnack.animating) return;
                        activeSnack.start = performance.now();
                        activeSnack.hide();
                }, timeout);
                this.show();
        }

        function destroy(this: Snackbar): void {
                this.close.removeEventListener("click", this.closeClickHandler);
                document.body.removeChild(this.root);
        }

        const self = {
                root,
                close,
                show,
                hide,
                closeClickHandler: (null as unknown) as EventListener,
                [init]: _init,
                animating: false,
                tick: false,
                closeAnimation: _closeAnimation,
                closeTick,
                start: 0,
                destroy
        };

        self[init]();

        return self;
};
