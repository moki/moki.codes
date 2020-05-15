import { h } from "preact";
import { useState, useRef } from "preact/hooks";

export type TextFieldProps = JSX.IntrinsicElements & {
        label: string;
        valfn: (value: string) => boolean;
        updateValid?: any;
        updateValue?: any;
        type: "text" | "email";
        classes?: string;
};

/* TODO: Merge FSM? */
const INACTIVE = 0;
const SELECTED = 1;
const STATES = 2;

const PRESTINE = 2;
const VALID = 1;
const INVALID = 0;
const _STATES = 3;

const fieldClassmap = ["", "text-field_selected"];
const inputClassmap = ["", "text-field__input_selected"];
const labelClassmap = ["", "text-field__label_selected"];
const statusClassmap = ["text-field_invalid", "text-field_valid", ""];

export function TextField({
        label,
        valfn,
        updateValid,
        updateValue,
        classes,
        type,
        ...rest
}: TextFieldProps) {
        const input = useRef(null);

        const [state, setState] = useState(INACTIVE);
        const [value, setValue] = useState("");
        const [valid, setValid] = useState(PRESTINE);

        const fieldClasses =
                "text-field" +
                `${state < STATES ? " " + fieldClassmap[state] : ""}` +
                `${valid < _STATES ? " " + statusClassmap[valid] : ""}` +
                `${classes ? " " + classes : ""}`;
        const inputClasses = "text-field__input";
        const labelClasses =
                "text-field__label" +
                `${state < STATES ? " " + " " + labelClassmap[state] : ""}`;

        function handleFocus(e: Event) {
                if (input.current)
                        ((input.current as unknown) as HTMLInputElement).focus();
                setState(SELECTED);
        }
        function handleUnFocus(e: Event) {
                if (value) return;
                setState(INACTIVE);
        }
        function handleInput(e: Event) {
                const val = (e.target as HTMLInputElement).value;
                setValue(val);
                updateValue && updateValue(val);

                const valid = ~~valfn(val);
                setValid(valid);
                updateValid && updateValid(valid === 1);
        }

        return (
                <div class={fieldClasses} onClick={handleFocus} {...rest}>
                        <input
                                ref={input}
                                value={value}
                                type={type}
                                class={inputClasses}
                                onBlur={handleUnFocus}
                                onFocus={handleFocus}
                                onInput={handleInput}
                        />
                        <label class={labelClasses}>
                                <div
                                        class={`elevation elevation_depth_${
                                                state === SELECTED ? 1 : 0
                                        }`}
                                ></div>
                                {label}
                        </label>
                </div>
        );
}
