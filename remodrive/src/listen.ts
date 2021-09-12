import { setBool, setValue } from "./input";
import { keyboard } from "./stores";

var listening: boolean = false;

var listenKeyboard: boolean;
keyboard.subscribe((val) => {
    listenKeyboard = val;
    if (!val && listening) {
        listenGamepad();
    }
});

export function listen() {
    listening = true;
    keyboardListeners();
    if (!listenKeyboard) {
        requestAnimationFrame(listenGamepad);
    }
}

function listenGamepad() {
    let gamepads = navigator.getGamepads();
    for (var i = 0; i < gamepads.length; i++) {
        let gamepad: Gamepad = gamepads[i];
        if (gamepad == null) {
            continue
        }
        for (var j = 0; j < gamepad.buttons.length; j++) {
            let button = gamepad.buttons[j];
            if (j in gamepadBtnMap) {
                setBool(gamepadBtnMap[j], button.pressed);
            }
        }
        for (var j = 0; j < gamepad.axes.length; j++) {
            let axis = gamepad.axes[j];
            if (j in gamepadAxisMap) {
                setValue(gamepadAxisMap[j], axis);
            }
        }
    }

    if (!listenKeyboard) {
        requestAnimationFrame(listenGamepad);
    }
}

function keyboardListeners() {
    window.onkeydown = (e) => {
        if (e.keyCode in keyboardAxisMap) {
            setValue(keyboardAxisMap[e.keyCode].name, keyboardAxisMap[e.keyCode].value);
        } else if (e.keyCode in keyboardBtnMap) {
            setBool(keyboardBtnMap[e.keyCode], true);
        }
    }
    window.onkeyup = (e) => {
        if (e.keyCode in keyboardAxisMap) {
            setValue(keyboardAxisMap[e.keyCode].name, 0);
        } else if (e.keyCode in keyboardBtnMap) {
            setBool(keyboardBtnMap[e.keyCode], false);
        }
    }
}

var gamepadBtnMap: Record<number, string> = {
    0: "A",
    1: "B",
    2: "X",
    3: "Y",

    4: "leftBumper",
    5: "rightBumper",
    6: "leftTrigger",
    7: "rightTrigger",

    12: "dpadUp",
    13: "dpadDown",
    14: "dpadLeft",
    15: "dpadRight"
}

var gamepadAxisMap: Record<number, string> = {
    0: "leftX",
    1: "leftY",
    2: "rightX",
    3: "rightY"
}

var keyboardBtnMap:  Record<number, string> = {
    90: "A",
    88: "B",
    67: "X",
    86: "Y",

    73: "dpadUp",
    74: "dpadLeft",
    75: "dpadDown",
    76: "dpadRight",

    190: "rightTrigger",
    188: "leftTrigger",
    222: "rightBumper",
    186: "leftBumper"
}

type keyboardAxis = {
    name: string,
    value: number
}

var keyboardAxisMap: Record<number, keyboardAxis> = {
    87: {
        name: "leftY",
        value: -1
    },
    83: {
        name: "leftY",
        value: 1
    },
    65: {
        name: "leftX",
        value: -1
    },
    68: {
        name: "leftX",
        value: 1
    },
    38: {
        name: "rightY",
        value: 1
    },
    40: {
        name: "rightY",
        value: -1
    },
    37: {
        name: "rightX",
        value: -1
    },
    39: {
        name: "rightX",
        value: 1
    },
}