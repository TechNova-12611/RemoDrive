<script lang="ts">
import Intro from "./Intro.svelte";
import Navbar from "./Navbar.svelte";
import RemoDrive from "./RemoDrive.svelte";
import { intro} from "./stores";
</script>

<Navbar/>
<div class="container text-center mt-3">
	{#if $intro}
		<Intro/>
	{:else}
		<RemoDrive/>
	{/if}
</div>