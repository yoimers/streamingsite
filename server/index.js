const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("Running");
});

let numUsers = 0;
const roomhost = {};
const store = {};
io.on("connection", (socket) => {
  //▼初期化周り
  let addedUser = false;
  socket.on("join", (roomId, isHost) => {
    if (addedUser) return;
    numUsers += 1;
    console.log(numUsers);
    addedUser = true;
    if (isHost) {
      roomhost[roomId] = socket.id;
    }
    store[socket.id] = { roomId, isHost };
    socket.join(roomId); //roomIdは放送URLのId
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      numUsers -= 1;
      socket.leave(store[socket.id].roomId);
      if (roomhost[store[socket.id].roomId] === socket.id) {
        delete roomhost[store[socket.id].roomId];
      }
      delete store[socket.id];
    }
  });
  //▲初期化周り

  socket.on("P2POfferFromListener", (data) => {
    //視聴者からのP2P接続オファーを受信
    const hostId = roomhost[store[socket.id] && store[socket.id].roomId];
    if (hostId) {
      io.to(hostId).emit("P2POfferToHost", data, socket.id); //放送者へ(data,fromId)を横流し
    }
  });

  socket.on("P2PAnswerFromHost", (data, toId) => {
    //放送者からのP2P接続アンサーを受信
    console.log("P2PAnswerFromHost");
    io.to(toId).emit("P2PAnswerToListener", data); //リスナーへdataを横流し
  });

  socket.on("IceCandidateFromListener", (data) => {
    //リスナーからの候補
    const hostId = roomhost[store[socket.id] && store[socket.id].roomId];
    if (hostId) {
      io.to(hostId).emit("IceCandidateToHost", data, socket.id); //放送者へdataを横流し
    }
  });

  socket.on("IceCandidateFromHost", (data, toId) => {
    //ホストからの候補
    io.to(toId).emit("IceCandidateToListener", data); //リスナーへdataを横流し
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
