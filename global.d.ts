declare module "*.css";

declare namespace JSX {
        interface Element {}
        interface IntrinsicElements {}
        interface HTMLAttributes {
                decoding?: string;
        }
}
