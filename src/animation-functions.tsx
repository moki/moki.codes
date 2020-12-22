import { bezier } from "lib/cubic-bezier";

export const stdfn = bezier(0.4, 0, 0.2, 1);
export const sharpfn = bezier(0.4, 0, 0.6, 1);
export const decfn = bezier(0, 0, 0.2, 1);
export const accfn = bezier(0.4, 0, 1, 1);
