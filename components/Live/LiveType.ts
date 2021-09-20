import moment from "moment";

export interface CommentType {
  commentId: string;
  documentId: string;
  uid: string;
  content: string;
  createdAt: number;
  displayName?: string;
}
