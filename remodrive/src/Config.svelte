<script lang="ts">
import { drive } from "./drive";

import { gamepad, gamepad1, gamepad2, room } from "./stores";

let editingStage = 0;

function doneEditingGamepad(gamepadId: string) {
    gamepad.set(gamepadId);
    editingStage = 1;
}
</script>

<div>
    {#if editingStage == 0}
        <btn class="btn btn-primary" on:click={() => {doneEditingGamepad(gamepad1)}}>Gamepad 1</btn>

        or
        
        <btn class="btn btn-primary" on:click={() => {doneEditingGamepad(gamepad2)}}>Gamepad 2</btn>

        ?
    {/if}

    {#if editingStage == 1}
        <div class="input-group">
            <input class="form-control" bind:value={$room} placeholder="Room Name..."/>
            <button class="btn btn-success" disabled={$room == ""} on:click={drive}>Drive!</button>
        </div>
    {/if}
</div>