import express from "express";
import morgan from "morgan";
import errorhandler from "error-handler";
import cors from "cors";
import http from "http";
import socketIo, { Server as SocketIOServer, Socket } from "socket.io";

import router from "./router";

const app = express();

/**
 * Socket IO SETUP
 */
const server: http.Server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Send existing products to the client upon connection
  // socket.emit('products', products);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Listen for 'addProduct' event from the client
  socket.on("addProduct", (newProduct) => {
    // products.push(newProduct);
    // Broadcast the new product to all connected clients
    io.emit("productAdded", newProduct);
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

export default app;
