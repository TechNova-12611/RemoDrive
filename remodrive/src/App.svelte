<script lang="ts">
import Config from "./Config.svelte";
import Instructions from "./Instructions.svelte";
import Navbar from "./Navbar.svelte";
import { editing } from "./stores";
</script>

<Navbar/>
<div class="container text-center mt-3">
	{#if $editing}
		<Config/>
	{:else}
		<Instructions/>
	{/if}
</div>