import { createServer } from "node:http";
import { addMessage, getMessages } from "@/app/action";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/lib/types";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.on("connection", async socket => {
    console.log("A user connected!");

    socket.emit("messagesHistory", await getMessages());

    socket.on("message", async (newMessage: string) => {
      console.log("Message received:", newMessage);

      await addMessage(newMessage);
      const updatedMessages = await getMessages();

      io.emit("messagesHistory", updatedMessages);
    });
  });

  httpServer
    .once("error", err => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
