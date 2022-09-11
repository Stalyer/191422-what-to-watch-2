import { FilmGenre } from "./film-genre.enum.js";
import { User } from "./user.type.js";

export type Film = {
  name: string;
  description: string;
  publictionDate: Date;
  genre: FilmGenre;
  released: number;
  rating: Number;
  previewVideoImage: string;
  previewVideoLink: string;
  starring: string[];
  director: string;
  runTime: number;
  commentCount: number;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  user: User;
}
