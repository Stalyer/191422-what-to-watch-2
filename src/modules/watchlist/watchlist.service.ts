import {inject, injectable} from 'inversify';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {WatchlistEntity} from './watchlist.entity.js';
import {Component} from '../../types/component.types.js';
import {FilmEntity} from '../film/film.entity.js';

@injectable()
export default class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>> {
    const existedFilmWatchlist = await this.findById(dto.userId, dto.filmId);

    if (existedFilmWatchlist) {
      return existedFilmWatchlist;
    }

    const result = await this.watchlistModel.create(dto);
    return result;
  }

  public async find(userId: string): Promise<DocumentType<FilmEntity>[]> {
    const watchlist = await this.watchlistModel
      .find({userId})
      .exec();
    if (!watchlist) {
      return [];
    }

    const filmIds = watchlist.map((item) => item.filmId);
    const films = await this.filmModel
      .find({'_id': { '$in': filmIds}})
      .exec();
    return films;
  }

  public async findById(userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null> {
    const result = await this.watchlistModel
      .findOne({userId, filmId})
      .exec();
    return result;
  }

  public async deleteById(userId: string, filmId: string): Promise<DocumentType<WatchlistEntity> | null> {
    return this.watchlistModel
      .findOneAndDelete({userId, filmId})
      .exec();
  }
}
