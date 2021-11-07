import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const scheduledFunction = functions
  .region("asia-northeast1")
  .pubsub.schedule("every 10 minutes")
  .onRun((context: any) => {
    const db = admin.firestore();
    const user: { [key: string]: any } = {};
    const nowbroadRef = db
      .collection("broads")
      .orderBy("createdAt", "desc")
      .where("isNow", "==", true);
    nowbroadRef.get().then((querySnapshot: any) => {
      querySnapshot.forEach((broad: any) => {
        const data = broad.data();
        const broadId = broad.id;
        checkTimeOver(db, data, broadId);
        checkSameUser(db, data, broadId, user);
      });
    });
    return null;
  });

const checkTimeOver = (
  db: FirebaseFirestore.Firestore,
  data: any,
  broadId: string
) => {
  const now = Date.now() / 1000;
  if (now - data.createdAt.seconds > 3600 * 600) {
    console.log(`６時間以上経過！${broadId}`);
    finishedBroad(db, broadId);
  }
};

const checkSameUser = (
  db: FirebaseFirestore.Firestore,
  data: any,
  broadId: string,
  user: { [key: string]: any }
) => {
  if (user[data.uid]) {
    finishedBroad(db, broadId);
  } else {
    user[data.uid] = true;
  }
};

const finishedBroad = (db: FirebaseFirestore.Firestore, broadId: string) => {
  db.collection("broads").doc(broadId).set(
    {
      isNow: false,
    },
    { merge: true }
  );
};
