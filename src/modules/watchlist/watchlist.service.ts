import {inject, injectable} from 'inversify';
import {Types} from 'mongoose';
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
    const watchlist = await this.findIds(userId);
    if (!watchlist) {
      return [];
    }

    return this.filmModel
      .aggregate([
        { $match: {'_id': { $in: watchlist}} },
        {
          $lookup: {
            from: 'users',
            let: { userId: '$userId' },
            pipeline: [{ $match: { $expr: { $eq: ['$$userId', '$_id'] } } }],
            as: 'userId',
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
            isWatchlist: true
          },
        }
      ])
      .exec();
  }

  public async findIds(userId: string): Promise<Types.ObjectId[]> {
    const watchlist = await this.watchlistModel
      .find({userId})
      .exec();
    if (!watchlist) {
      return [];
    }

    return watchlist.map((item) => item.filmId) as Types.ObjectId[];
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

  public async deleteByFilmId(filmId: string): Promise<number> {
    const result = await this.watchlistModel
      .deleteMany({filmId})
      .exec();

    return result.deletedCount;
  }
}
