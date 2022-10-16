import {FilmGenre} from '../../../types/film-genre.enum.js';

export default class CreateFilmDto {
  public name!: string;
  public description!: string;
  public publictionDate!: Date;
  public genre!: FilmGenre;
  public released!: number;
  public previewVideoImage!: string;
  public previewVideoLink!: string;
  public starring!: string[];
  public director!: string;
  public runTime!: number;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
  public userId!: string;
  public isPromo!: boolean;
}