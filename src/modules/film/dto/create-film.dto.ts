import {FilmGenre} from '../../../types/film-genre.enum.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean
} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(2, {message: 'Minimum name length must be 2'})
  @MaxLength(100, {message: 'Maximum name length must be 100'})
  public name!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'publictionDate must be valid ISO date'})
  public publictionDate!: Date;

  @IsEnum(FilmGenre, {message: 'type must be Film Genre'})
  public genre!: FilmGenre;

  @IsInt({message: 'released must be an integer'})
  public released!: number;

  @IsString({message: 'previewVideoImage is required'})
  public previewVideoImage!: string;

  @IsString({message: 'previewVideoLink is required'})
  public previewVideoLink!: string;

  @IsArray({message: 'Field starring must be an array'})
  public starring!: string[];

  @IsString({message: 'director is required'})
  public director!: string;

  @IsInt({message: 'runTime must be an integer'})
  public runTime!: number;

  @IsString({message: 'posterImage is required'})
  public posterImage!: string;

  @IsString({message: 'backgroundImage is required'})
  public backgroundImage!: string;

  @IsString({message: 'backgroundColor is required'})
  public backgroundColor!: string;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsBoolean({message: 'isPromo must be an boolean'})
  public isPromo!: boolean;
}
