import { h, createContext } from "preact";
import {
        useState,
        useContext,
        useEffect,
        useMemo,
        StateUpdater
} from "preact/hooks";
import { Animation } from "src/components/animation";
import { decfn } from "src/animation-functions";

const DISPLAY_TIME = 2000;

export type Snackbar = {
        message: string;
        type: "success" | "error" | "default";
};

export type SnackbarContext = {
        snacks: Snackbar[];
        addSnack: (snackbar: Snackbar) => void;
};

export const SnackbarContext = createContext({} as SnackbarContext);

export type SnackbarProps = JSX.IntrinsicElements & {
        children?: JSX.Element | JSX.Element[];
};

export function Snackbar({ children, ...rest }: SnackbarProps) {
        const [snacks, setSnacks] = useState([] as Snackbar[]);
        const [snack, setSnack] = useState((null as unknown) as Snackbar);

        const mixin = {
                value: {
                        snacks,
                        addSnack: (snackbar: Snackbar) => {
                                if (!snack) {
                                        setSnack(snackbar);
                                        return;
                                }

                                setSnacks([...snacks, snackbar]);
                        }
                }
        };

        useEffect(() => {
                const timer = setTimeout(() => {
                        setSnack(snacks[0] ?? ((null as unknown) as Snackbar));
                        setSnacks(snacks => snacks.slice(1));
                }, DISPLAY_TIME);
                return () => clearTimeout(timer);
        }, [snack, snacks]);

        const Snack = ({ snackbar, ...rest }: { snackbar: Snackbar }) => {
                const opacity = Animation(decfn, 250, 0);
                return (
                        <div
                                class="snackbar"
                                style={"opacity: " + opacity}
                                {...rest}
                        >
                                <div class="elevation elevation_depth_6"></div>
                                {snackbar.message}
                        </div>
                );
        };
        const memoSnack = useMemo(() => {
                return snack ? <Snack snackbar={snack} /> : "";
        }, [snack]);

        return (
                <SnackbarContext.Provider {...mixin}>
                        {children}
                        <div class="snackbar-container">{memoSnack}</div>
                </SnackbarContext.Provider>
        );
}
