<script lang="ts">
import { editing, gamepad, gamepad1, keyboard, room } from "./stores";


    
</script>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">RemoDrive</span>
        
        {#if !$editing}
            <span class="navbar-text navbar-switch-text">Gamepad {$gamepad == gamepad1 ? "1" : "2"} | {$room}</span>
        {/if}

        <div class="form-inline navbar-switch">
            <span class="navbar-text navbar-switch-text">{$keyboard ? "Keyboard" : "Gamepad" }</span>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" bind:checked={$keyboard}>
            </div>
        </div>
    </div>
</nav>

<style>
    .navbar-switch-text {
        line-height: 7px;
        margin-right: 7px;
    }

    .navbar-switch {
        display: flex;
        flex-direction: row;
    }
</style>