import { writable } from "svelte/store";

export const gamepad = writable("g1");
export const keyboard = writable(true);
export const room = writable("");

export const gamepad1 = "g1";
export const gamepad2 = "g2";

export const editing = writable(true);
export const intro = writable(true);