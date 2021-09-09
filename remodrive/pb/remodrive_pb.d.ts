// package: remodrive
// file: remodrive.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class DriverMessage extends jspb.Message {
  getRoom(): string;
  setRoom(value: string): void;

  getCommand(): string;
  setCommand(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DriverMessage.AsObject;
  static toObject(includeInstance: boolean, msg: DriverMessage): DriverMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DriverMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DriverMessage;
  static deserializeBinaryFromReader(message: DriverMessage, reader: jspb.BinaryReader): DriverMessage;
}

export namespace DriverMessage {
  export type AsObject = {
    room: string,
    command: string,
  }
}

