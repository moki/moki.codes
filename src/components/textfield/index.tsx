import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";

export type TextFieldProps = JSX.IntrinsicElements & {
        label: string;
        valfn: (value: string) => boolean;
        updateValid?: any;
        updateValue?: any;
        type: "text" | "email";
        classes?: string;
        value?: string;
        id: string;
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
        id,
        value = "",
        ...rest
}: TextFieldProps) {
        const input = useRef(null);

        const [state, setState] = useState(INACTIVE);
        const [_value, setValue] = useState(value);
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
                if (_value) return;
                setState(INACTIVE);
        }

        function handleInput(e: Event) {
                const val = (e.target as HTMLInputElement).value;
                setValue(val);
                updateValue && updateValue(val);

                const valid = ~~valfn(val);
                setValid(valid);
                updateValid && updateValid(valid & 1);
        }

        useEffect(() => {
                setValue(value);

                if (value === "") {
                        const mbinput: maybe<HTMLInputElement> = input;
                        if (mbinput.current === null) return;
                        mbinput.current.blur();

                        setValid(PRESTINE);
                        setState(INACTIVE);

                        return;
                }

                const _valid = ~~valfn(value);
                setValid(_valid);
                updateValid && updateValid(_valid & 1);
        }, [value]);

        return (
                <div class={fieldClasses} onClick={handleFocus} {...rest}>
                        <input
                                ref={input}
                                value={_value}
                                type={type}
                                class={inputClasses}
                                onBlur={handleUnFocus}
                                onFocus={handleFocus}
                                onInput={handleInput}
                                id={id}
                        />
                        <label class={labelClasses} for={id}>
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
