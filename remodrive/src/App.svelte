<script lang="ts">
import Config from "./Config.svelte";
import Instructions from "./Instructions.svelte";
import Navbar from "./Navbar.svelte";
import { editing, keyboard } from "./stores";
</script>

<Navbar/>
<div class="container text-center mt-3">
	{#if $editing}
		<Config/>
	{:else}
		{#if $keyboard}
			<Instructions/>
		{:else}
			<h1>Keybinds</h1>

			<p class="lead">An action on the gamepad is mirrored on the robot. Toggle the switch in the top-right to simulate a gamepad with the keyboard.</p>
		{/if}
	{/if}
</div>