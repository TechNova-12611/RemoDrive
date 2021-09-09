import { listen } from "./listen";
import { connect } from "./grpc";
import { editing } from "./stores";

export function drive() {
	editing.set(false);
	connect();
	listen();
}