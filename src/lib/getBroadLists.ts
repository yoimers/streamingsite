import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { CardType } from "../../components/Card/CardType";
import { db } from "./firebase";

export const getBroadLists = async (num: number = 10, last?: any) => {
  const q = last
    ? query(
        collection(db, `broads`),
        where("isNow", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(last),
        limit(num)
      )
    : query(
        collection(db, `broads`),
        where("isNow", "==", true),
        orderBy("createdAt", "desc"),
        limit(num)
      );
  const querySnapshot = await getDocs(q);
  const cards: CardType[] = [];
  querySnapshot.forEach((doc) => {
    const data = toData(doc);
    delete data.imageSource;
    cards.push({ ...data });
  });
  return { cards };
};

const toData = (doc: any): any => {
  const data = doc.data();
  return {
    ...data,
    broadId: doc.id,
    createdAt: data.createdAt.seconds,
    timeStamp: data.createdAt,
  };
};
