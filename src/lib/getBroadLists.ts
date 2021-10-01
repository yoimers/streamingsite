import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const getBroadLists = async () => {
  const q = query(
    collection(db, `broads`),
    where("isNow", "==", true),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};
