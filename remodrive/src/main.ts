import App from './App.svelte';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, init_gRPC } from './grpc';
import { editing } from './stores';
import { listen } from './listen';

init_gRPC();

const app = new App({
	target: document.body,
});

export default app;