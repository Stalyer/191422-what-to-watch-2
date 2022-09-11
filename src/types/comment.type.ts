import { User } from "./user.type.js";

export type Comment = {
  comment: string;
  rating: string;
  date: Date;
  user: User;
}
