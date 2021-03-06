import { Timestamp } from "@firebase/firestore";
import moment from "moment";

export interface CardType {
  broadId?: string;
  imageUrl: string;
  imageSource: string;
  title: string;
  content: string;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  createdAt: number | Timestamp;
  timeStamp: Timestamp;
  isNow: boolean;
  connections?: number;
  rating?: number;
  like?: number;
  dislike?: number;
}
