import { sendMessage } from "./conn";
import { gamepad } from "./stores";

type Values = {
    leftX: number;
    leftY: number;
    rightX: number;
    rightY: number;
}

type Bools = {
    A: boolean;
    B: boolean;
    X: boolean;
    Y: boolean;

    leftBumper: boolean;
    rightBumper: boolean;
    leftTrigger: boolean;
    rightTrigger: boolean;
    
    dpadUp: boolean;
    dpadDown: boolean;
    dpadLeft: boolean;
    dpadRight: boolean;
}

var values: Values = {
    leftX: 0,
    leftY: 0,
    rightX: 0,
    rightY: 0,
}

var bools: Bools = {
    A: false,
    B: false,
    X: false,
    Y: false,

    leftBumper: false,
    rightBumper: false,
    leftTrigger: false,
    rightTrigger: false,
    
    dpadUp: false,
    dpadDown: false,
    dpadLeft: false,
    dpadRight: false,
}

var gamepadVal: string;
gamepad.subscribe(gamepadValue => {gamepadVal = gamepadValue})

export function setValue(name: string, value: number) {
    value = Math.round(value * 100) / 100;
    if (values[name] != value) {
        values[name] = value;
        sendMessage(`${gamepadVal}_val_${name}_${value}`);
    }
}

export function setBool(name: string, value: boolean) {
    if (bools[name] != value) {
        bools[name] = value;
        sendMessage(`${gamepadVal}_bool_${name}_${value}`);
    }
}
