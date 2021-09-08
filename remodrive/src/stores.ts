import { writable } from "svelte/store";

export const gamepad = writable("g1");
export const keyboard = writable(true);
export const room = writable("");

export const editing = writable(true);