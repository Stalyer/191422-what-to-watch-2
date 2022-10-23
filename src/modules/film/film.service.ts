import {inject, injectable} from 'inversify';
import {Types} from 'mongoose';
import {FilmServiceInterface} from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';
import {SortType} from '../../types/sort-type.enum.js';
import {CommentEntity} from '../comment/comment.entity.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity> | null> {
    return (
      await this.filmModel
        .aggregate([
          { $match: { _id: new Types.ObjectId(filmId) } },
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
              isWatchlist:  {
                $cond: {
                  if: { $in: [ '$_id', watchlist ] },
                  then: true,
                  else: false,
                }
              }
            }
          },
        ])
        .exec()
    )[0];
  }

  public async findPromo(watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity> | null> {
    return (
      await this.filmModel
        .aggregate([
          { $match: { isPromo: true } },
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
              isWatchlist:  {
                $cond: {
                  if: { $in: [ '$_id', watchlist ] },
                  then: true,
                  else: false,
                }
              }
            }
          },
        ])
        .exec()
    )[0];
  }

  public async find(count?: number, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ? Number(count) : DEFAULT_FILM_COUNT;

    return this.filmModel
      .aggregate([
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
            isWatchlist:  {
              $cond: {
                if: { $in: [ '$_id', watchlist ] },
                then: true,
                else: false,
              }
            }
          }
        },
        { $limit: limit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async findByGenreName(genreName: string, count?: number, watchlist?: Types.ObjectId[]): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ? Number(count) : DEFAULT_FILM_COUNT;

    return this.filmModel
      .aggregate([
        { $match: { genre: genreName } },
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
            isWatchlist:  {
              $cond: {
                if: { $in: [ '$_id', watchlist ] },
                then: true,
                else: false,
              }
            }
          }
        },
        { $limit: limit },
        { $sort: { createdAt: SortType.Down } },
      ])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async updateRating(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    const result = await this.commentModel
      .aggregate([
        {
          $match: {
            filmId: new Types.ObjectId(filmId)
          }
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' }
          }
        }
      ])
      .exec();

    return this.filmModel
      .findByIdAndUpdate(filmId, {'$set': {
        rating: result[0]['avgRating'],
      }})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel
      .exists({_id: documentId})) !== null;
  }
}
