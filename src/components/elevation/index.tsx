import { render, h } from "preact";

export type Props = {
        depth: number;
};

export function Elevation({ depth }: Props) {
        return <div class={`elevation elevation_depth_${depth}`}></div>;
}
