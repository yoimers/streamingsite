"use strict";

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5005;
const INDEX = "/index.html";
const app = express();

// app.use(
//   cors({
//     origin: "https://streamingsite-eight.vercel.app/", //アクセス許可するオリジン
//     credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//     optionsSuccessStatus: 200, //レスポンスstatusを200に設定
//   })
// );

const server = app
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = require("socket.io")(server, {

const io = require("socket.io")(server, {
  // optional, useful for custom headers
  cookie: false,
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000", //"https://streamingsite-eight.vercel.app",
      "Access-Control-Allow-Methods": "GET,POST,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": [
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
      ],
      "Access-Control-Allow-Credentials": true,
    });
    res.end();
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(() => {
  io.emit("hello", new Date().toTimeString());
  io.emit("time", new Date().toTimeString());
}, 1000);
