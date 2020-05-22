declare module "*.css";

declare type SurfaceElevation = 0 | 1 | 2 | 4 | 8;

declare namespace JSX {
        interface Element {}
        interface IntrinsicElements {
                [key: string]: any;
        }
        interface HTMLAttributes {
                decoding?: string;
        }
}
