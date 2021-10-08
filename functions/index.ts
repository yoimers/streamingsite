import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp({ storageBucket: "gs://wavelet-f30ce" });
import * as express from "express";
import * as cors from "cors";
const app = express();
app.use(cors({ origin: true }));

export const api = functions.region("asia-northeast1").https.onRequest(app);

export const scheduledFunction = functions
  .region("asia-northeast1")
  .pubsub.schedule("every 10 minutes")
  .onRun((context: any) => {
    const db = admin.firestore();
    const nowbroadRef = db.collection("broads").where("isNow", "==", true);
    nowbroadRef.get().then((querySnapshot: any) => {
      querySnapshot.forEach((broad: any) => {
        const data = broad.data();
        const now = Date.now() / 1000;
        if (now - data.createdAt.seconds > 3600 * 600) {
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
