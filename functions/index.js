const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");
// const io = require("socket.io")(server);
// {
//   cors: {
//     origin: "http://localhost:3000/",
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//   },
// }
// app.use(
//   cors({
//     origin: "http://localhost:3000", //アクセス許可するオリジン
//     methods: ["GET", "POST", "OPTIONS"],
//     credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//     optionsSuccessStatus: 200, //レスポンスstatusを200に設定
//   })
// );
// app.get("/", (req, res) => {
//   res.send("Running");
//   io.on("connection", (socket) => {
//     console.log(socket.id);
//   });
// });
// io.on("connection", (socket) => {
//   console.log(socket.id);
// });
// exports.signalingg = functions.region("asia-northeast1").https.onRequest(app);
// exports.signaling = functions.region("asia-northeast1").https.onRequest(io);

exports.scheduledFunction = functions
  .region("asia-northeast1")
  .pubsub.schedule("every 10 minutes")
  .onRun((context) => {
    const db = admin.firestore();
    const nowbroadRef = db.collection("broads").where("isNow", "==", true);
    nowbroadRef.get().then((querySnapshot) => {
      querySnapshot.forEach((broad) => {
        const data = broad.data();
        const now = Date.now() / 1000;
        if (now - data.createdAt.seconds > 3600 * 6) {
          console.log(`６時間以上経過！${broad.id}`);
          db.collection("broads").doc(broad.id).set(
            {
              isNow: false,
            },
            { merge: true }
          );
        }
      });
    });
    return null;
  });
