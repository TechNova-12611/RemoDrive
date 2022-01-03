<script lang="ts">
import { drive } from "./drive";

import { gamepad, gamepad1, gamepad2, name, room } from "./stores";

let driveTxt = "Drive!";
let driveDisabled = false;

$: name.set($name.replaceAll(":", ""));
$: room.set($room.replaceAll(":", ""));

async function driveBot() {
    driveDisabled = true;
    driveTxt = "Connecting...";
    await drive();
    driveDisabled = false;
    driveTxt = "Drive!";
}
</script>

<div>
    <div class="input-group">
        <input type="text" class="form-control" bind:value={$room} placeholder="Room Name">
        <input type="text" class="form-control" bind:value={$name} placeholder="Your Name">
        <select class="form-select" bind:value={$gamepad}>
            <option value={gamepad1}>Gamepad 1</option>
            <option value={gamepad2}>Gamepad 2</option>
        </select>
        <button class="btn btn-success" disabled={$room == "" || $name == "" || driveDisabled} on:click={driveBot}>{driveTxt}</button>
    </div>
</div>