import { DriverMessage } from '../pb/remodrive_pb';
import { RemoDriveClient, RequestStream } from '../pb/remodrive_pb_service';
import { room } from "./stores";

export var client: RemoDriveClient;
export var conn: RequestStream<DriverMessage>;

export function init_gRPC() {
    client = new RemoDriveClient("https://rpc.nv7haven.tk");
}

export function connect() {
    conn = client.drive();
}

var roomVal: string;
room.subscribe(val => {roomVal = val});

export function sendMessage(command: string) {
    let msg = new DriverMessage();
    msg.setCommand(command);
    msg.setRoom(roomVal);
    conn.write(msg);
}