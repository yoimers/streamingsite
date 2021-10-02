// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// const PORT = process.env.PORT || 5001;

// app.get("/", (req, res) => {
//   res.send("Running");
// });

// io.on("connection", (socket) => {
//   console.log("connection");
//   socket.on("roomsatu", (e) => {
//     console.log(e);
//     socket.emit("unti", e.post);
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });
// });
// export default function handler(req, res) {
//   res.status(200).json({ name: "aa" });
// }

// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
