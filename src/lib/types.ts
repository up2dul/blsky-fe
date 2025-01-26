export interface ServerToClientEvents {
  message: (message: string) => void;
  messagesHistory: (messages: Message[]) => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
}
