import express from "express";
import morgan from "morgan";
import errorhandler from "error-handler";
import { createServer } from "node:http";

import cors from "cors";
import { Server } from "socket.io";

import router from "./router";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_APP_URL || "http://localhost:4200",
  },
});
/**
 * Socket IO SETUP
 */
io.on("connection", (socket) => {
  socket.on("product:add", (data) => {
    io.emit("product:created", data);
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

io.listen(3000);

export default app;
