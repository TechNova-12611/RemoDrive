import { room } from "./stores";

export var conn: WebSocket;

var roomVal: string;
room.subscribe(val => {roomVal = val});

export async function connect(): Promise<void> {
    conn = new WebSocket("wss://http.nv7haven.tk/drive")
    return new Promise<void>((resolve) => {
        conn.onopen = () => {
            conn.send(roomVal);
            resolve();
        }
    });
}

export function sendMessage(command: string) {
    conn.send(command);
}