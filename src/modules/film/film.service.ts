import {inject, injectable} from 'inversify';
import {FilmServiceInterface} from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';
import {SortType} from '../../types/sort-type.enum.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userId'])
      .exec();
  }

  public async findPromo(): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findOne({isPromo: true})
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel
      .find({}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async findByGenreName(genreName: string, count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return this.filmModel
      .find({genre: genreName}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
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

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel
      .exists({_id: documentId})) !== null;
  }
}