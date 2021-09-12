import { listen } from "./listen";
import { connect } from "./conn";
import { editing } from "./stores";

export async function drive() {
	await connect();
	editing.set(false);
	listen();
}