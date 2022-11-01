import {FilmGenre} from '../../../types/film-genre.enum.js';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional
} from 'class-validator';

export default class UpdateFilmDto {
  @IsOptional()
  @MinLength(2, {message: 'Minimum name length must be 2'})
  @MaxLength(100, {message: 'Maximum name length must be 100'})
  public name?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'publictionDate must be valid ISO date'})
  public publictionDate?: Date;

  @IsOptional()
  @IsEnum(FilmGenre, {message: 'type must be Film Genre'})
  public genre?: FilmGenre;

  @IsOptional()
  @IsInt({message: 'released must be an integer'})
  public released?: number;

  @IsOptional()
  @IsString({message: 'previewVideoImage is required'})
  public previewVideoImage?: string;

  @IsOptional()
  @IsString({message: 'previewVideoLink is required'})
  public previewVideoLink?: string;

  @IsOptional()
  @IsString({message: 'videoLink is required'})
  public videoLink?: string;

  @IsOptional()
  @IsArray({message: 'Field starring must be an array'})
  public starring?: string[];

  @IsOptional()
  @IsString({message: 'director is required'})
  public director?: string;

  @IsOptional()
  @IsInt({message: 'runTime must be an integer'})
  public runTime?: number;

  @IsOptional()
  @IsString({message: 'posterImage is required'})
  public posterImage?: string;

  @IsOptional()
  @IsString({message: 'backgroundImage is required'})
  public backgroundImage?: string;

  @IsOptional()
  @IsString({message: 'backgroundColor is required'})
  public backgroundColor?: string;

  @IsOptional()
  @IsBoolean({message: 'isPromo must be an boolean'})
  public isPromo?: boolean;
}
