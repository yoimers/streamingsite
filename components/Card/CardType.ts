import { Timestamp } from "@firebase/firestore";
import moment from "moment";

export interface CardType {
  broadId?: string;
  imageUrl: string;
  title: string;
  content: string;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  createdAt: number | Timestamp;
  isNow: boolean;
  connections?: number;
  rating?: number;
  like?: number;
  dislike?: number;
}
