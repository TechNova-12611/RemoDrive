<script lang="ts">
import { gamepad, keyboard, room } from "./stores";
</script>

<div class="text-start">
    <h2>Gamepad</h2>

    <div class="form-check">
        <input class="form-check-input" type="radio" name="gamepadRadio" value="g1" bind:group={$gamepad}>
        <label class="form-check-label" for="flexRadioDefault1">
            Gamepad 1
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gamepadRadio" value="g2" bind:group={$gamepad}>
        <label class="form-check-label" for="flexRadioDefault1">
            Gamepad 2
        </label>
    </div>

    <br>
    <h2>Settings</h2>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" bind:checked={$keyboard}>
        <span class="form-check-label">Keyboard</span>
    </div>

    <br>
    <h2>Room</h2>
    <input type="text" class="form-control" bind:value={$room}>
    
    <br>
</div>