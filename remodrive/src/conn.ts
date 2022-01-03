import { name, room } from "./stores";

export var conn: WebSocket;

var roomVal: string;
room.subscribe(val => {roomVal = val});
var nameVal: string;
name.subscribe(val => {nameVal = val});

export async function connect(): Promise<void> {
    conn = new WebSocket("wss://http.nv7haven.com/drive")
    return new Promise<void>((resolve) => {
        conn.onopen = () => {
            conn.send(roomVal + ":" + nameVal);
            resolve();
        }
    });
}

export function sendMessage(command: string) {
    conn.send(command);
}