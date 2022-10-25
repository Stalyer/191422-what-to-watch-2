import {DocumentType} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';
import {WatchlistEntity} from './watchlist.entity.js';
import {FilmEntity} from '../film/film.entity.js';

export interface WatchlistServiceInterface {
  create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>>;
  find(userId: string): Promise<DocumentType<FilmEntity>[]>;
  findIds(userId: string): Promise<Types.ObjectId[]>;
  findById(userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null>;
  deleteById(userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null>;
  deleteByFilmId(filmId: string): Promise<number | null>;
}
