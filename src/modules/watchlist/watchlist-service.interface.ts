import {DocumentType} from '@typegoose/typegoose';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';
import {WatchlistEntity} from './watchlist.entity.js';

export interface WatchlistServiceInterface {
  create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>>;
  find(): Promise<DocumentType<WatchlistEntity>[]>;
}
