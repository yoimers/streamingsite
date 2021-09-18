import moment from "moment";

export interface CardType {
  broadId: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  user: string;
  createdAt: moment.Moment;
  connections: number;
  rating: number;
  like: number;
  dislike: number;
}
