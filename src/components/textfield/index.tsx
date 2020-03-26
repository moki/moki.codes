const init = Symbol("init");

const username = (input: string) =>
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(input);

const valfns = {
        text: username,
        email: (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
        username
};

export const strings = {
        STATE_VALID_CHANGED_EVENT: "mokui-textfield:state-valid-changed"
};

export type TextFieldValidation = (string: string) => boolean;

export type TextField = {
        id: string;
        type: string;
        input: HTMLInputElement;
        label: HTMLLabelElement;
        inputSelectedClasses: string[];
        labelSelectedClasses: string[];
        inputHandler: EventListener;
        focusinHandler: EventListener;
        focusoutHandler: EventListener;
        listener: EventTarget;
        checkTarget(this: TextField, target: EventTarget): boolean;
        value: string;
        valfn: TextFieldValidation;
        valid: boolean;
        emit<U extends object>(
                this: TextField,
                type: string,
                detail: U,
                bubbles: boolean,
                on: EventTarget
        ): void;
        destroy(this: TextField): void;
};

export const TextField = ({
        id,
        type,
        listener,
        inputSelectedClasses,
        labelSelectedClasses,
        valfn
}: {
        id: string;
        type: "text" | "email";
        listener?: EventTarget;
        inputSelectedClasses?: string[];
        labelSelectedClasses?: string[];
        valfn?: TextFieldValidation;
}): TextField => {
        function emit<U extends object>(
                this: TextField,
                type: string,
                detail: U,
                bubbles = false,
                on: EventTarget
        ) {
                let e: CustomEvent<U>;
                if (typeof CustomEvent === "function") {
                        e = new CustomEvent<U>(type, { bubbles, detail });
                } else {
                        e = document.createEvent("CustomEvent");
                        e.initCustomEvent(type, bubbles, false, detail);
                }
                on.dispatchEvent(e);
        }
        function checkTarget(this: TextField, target: EventTarget): boolean {
                const element = target as HTMLInputElement;
                return !!element.id && element.id === this.id;
        }
        function handleFocusin(this: TextField, e: Event) {
                if (!e.target) return;
                if (!this.checkTarget(e.target)) return;
                this.input.classList.add(...this.inputSelectedClasses);
                this.label.classList.add(...this.labelSelectedClasses);
        }
        function handleFocusout(this: TextField, e: Event) {
                if (!e.target) return;
                if (!this.checkTarget(e.target)) return;
                if (this.value.length) return;
                this.input.classList.remove(...this.inputSelectedClasses);
                this.label.classList.remove(...this.labelSelectedClasses);
        }
        function handleInput(this: TextField, e: Event) {
                if (!e.target) return;
                if (!this.checkTarget(e.target)) return;
                this.value = (e.target as HTMLInputElement).value;
                const valid = this.valfn(this.value);
                if (valid) {
                        this.input.classList.add("text-field__input_valid");
                        this.input.classList.remove(
                                "text-field__input_invalid"
                        );
                } else {
                        this.input.classList.add("text-field__input_invalid");
                        this.input.classList.remove("text-field__input_valid");
                }
                if (this.valid !== valid) {
                        this.valid = valid;
                        this.emit(
                                strings.STATE_VALID_CHANGED_EVENT,
                                {},
                                true,
                                this.input
                        );
                }
                this.valid = valid;
        }
        function _init(this: TextField) {
                this.input = document.querySelector(
                        `#${this.id}`
                ) as HTMLInputElement;
                if (!this.input)
                        throw new Error(`Didn't find input with ${this.id} id`);
                this.value = this.input.value;

                this.label = document.querySelector(
                        `label[for="${this.id}"]`
                ) as HTMLLabelElement;
                if (!this.label)
                        throw new Error(
                                `Didn't find label corresponding to the: ${this.id} input`
                        );
                this.focusinHandler = handleFocusin.bind(this);
                this.focusoutHandler = handleFocusout.bind(this);
                this.inputHandler = handleInput.bind(this);
                this.listener.addEventListener("input", this.inputHandler);
                this.listener.addEventListener("focusin", this.focusinHandler);
                this.listener.addEventListener(
                        "focusout",
                        this.focusoutHandler
                );
        }
        function destroy(this: TextField) {
                this.listener.removeEventListener("input", this.inputHandler);
                this.listener.removeEventListener(
                        "focusin",
                        this.focusinHandler
                );
                this.listener.removeEventListener(
                        "focusout",
                        this.focusoutHandler
                );
        }
        const self = {
                id,
                type,
                value: "",
                valid: false,
                inputSelectedClasses: [
                        "text-field__input_selected",
                        ...(inputSelectedClasses ?? [])
                ],
                labelSelectedClasses: [
                        "text-field__label_selected",
                        ...(labelSelectedClasses ?? [])
                ],
                listener: listener ?? window,
                valfn: valfn ?? valfns[type],
                input: (null as unknown) as HTMLInputElement,
                label: (null as unknown) as HTMLLabelElement,
                focusinHandler: (null as unknown) as EventListener,
                focusoutHandler: (null as unknown) as EventListener,
                inputHandler: (null as unknown) as EventListener,
                checkTarget,
                emit,
                [init]: _init,
                destroy(): void {}
        };

        self[init]();

        return self;
};
