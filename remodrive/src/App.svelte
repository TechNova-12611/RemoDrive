<script lang="ts">
import Config from "./Config.svelte";
import { editing, room } from "./stores";

function drive() {
    editing.set(false);
}
</script>
<div class="container text-center mt-3">
	<h1>RemoDrive</h1>
	{#if $editing}
	<Config/>
	<button class="btn btn-primary" disabled={$room === ""} on:click={drive}>Drive!</button>
	{/if}
</div>