<script lang="ts">
import { intro } from "./stores";
</script>

<h1>RemoDrive</h1>
<p class="lead">RemoDrive allows you to remotely control an FTC robot! Get more information at <a href="https://github.com/Technova-12611/RemoDrive">our GitHub repository</a>!</p>
<btn class="btn btn-success btn-lg" on:click={() => {intro.set(false)}}>Drive!</btn>