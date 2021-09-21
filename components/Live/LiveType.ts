import moment from "moment";

export interface CommentType {
  commentId: string;
  documentId: string;
  uid: string;
  content: string;
  createdAt: number;
  displayName?: string;
}

export interface LiveInfomationType {
  title: string;
  content: string;
  createdAt: number;
  uid: string;
  displayName: string;
  imageUrl: string;
  isNow: boolean;
  live: string;
  photoURL: string;
}
