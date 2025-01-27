import type { ColumnType, Generated, Insertable, Selectable } from "kysely";

export interface ServerToClientEvents {
  message: (message: string) => void;
  messagesHistory: (messages: Message[]) => void;
  messagesReset: () => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
  messagesReset: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface Message {
  id?: Generated<number>;
  content: string;
  timestamp?: Generated<ColumnType<Date, Date | string, Date | string>>;
}

export interface Database {
  messages: SelectMessage;
}

export type SelectMessage = Selectable<Message>;
export type NewMessage = Insertable<Message>;
