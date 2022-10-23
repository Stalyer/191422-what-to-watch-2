import {DocumentType} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {FilmEntity} from './film.entity.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(filmId: string, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity> | null>;
  findPromo(watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity> | null>;
  find(count?: number, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity>[]>;
  findByGenreName(genreName: string, count?: number, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateRating(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
