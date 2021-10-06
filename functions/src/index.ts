import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello");
});

export const scheduledFunction = functions.pubsub
  .schedule("every 5 minutes")
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
