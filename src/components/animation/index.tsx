import { useState, useEffect } from "preact/hooks";

export function Animation(
        fn: (a: number) => number,
        duration: number,
        delay: number
) {
        const elapsedTime = timer(duration, delay);
        const progress = Math.min(1, elapsedTime / duration);
        return fn(progress);
}

function timer(duration: number, delay: number) {
        const [elapsedTime, setTime] = useState(0);
        useEffect(() => {
                let animFrame: number;
                let timerStop: number;
                let start: number;
                function onFrame() {
                        setTime(Date.now() - start);
                        loop();
                }
                function loop() {
                        animFrame = requestAnimationFrame(onFrame);
                }
                function onStart() {
                        timerStop = window.setTimeout(() => {
                                cancelAnimationFrame(animFrame);
                                setTime(Date.now() - start);
                        }, duration);

                        start = Date.now();
                        loop();
                }
                const timerDelay = setTimeout(onStart, delay);

                return () => {
                        clearTimeout(timerStop);
                        clearTimeout(timerDelay);
                        cancelAnimationFrame(animFrame);
                };
        }, [duration, delay]);

        return elapsedTime;
}
