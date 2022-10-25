import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import {FilmServiceInterface} from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import {WatchlistServiceInterface} from '../watchlist/watchlist-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {RequestQuery} from '../../types/request-query.type.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import UploadPreviewImageResponse from './response/upload-preview-image.response.js';
import UploadPosterImageResponse from './response/upload-poster-image.response.js';
import UploadBackgroundImageResponse from './response/upload-background-image.response.js';

type ParamsGetFilm = {
  filmId: string;
}

type ParamsGetFilmsByGenre = {
  genre: string;
}

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateFilmDto)]
    });
    this.addRoute({path: '/genre/:genre', method: HttpMethod.Get, handler: this.getByGenre});
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'films', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'films', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'films', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId/image/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
    this.addRoute({
      path: '/:filmId/image/poster',
      method: HttpMethod.Post,
      handler: this.uploadPosterImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
    this.addRoute({
      path: '/:filmId/image/background',
      method: HttpMethod.Post,
      handler: this.uploadBackgroundImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.getPromo});
  }

  public async index(
    {query, user}: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
    const films = await this.filmService.find(query.limit, watchlist);
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {
    const result = await this.filmService.create({...body, userId: user.id});
    const film = await this.filmService.findById(result.id);
    this.created(res, fillDTO(FilmResponse, film));
  }

  public async getByGenre(
    {params, query, user}: Request<core.ParamsDictionary | ParamsGetFilmsByGenre, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
    const films = await this.filmService.findByGenreName(params.genre, query.limit, watchlist);
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async show(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
    const film = await this.filmService.findById(filmId, watchlist);
    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.deleteById(filmId);
    await this.commentService.deleteByFilmId(filmId);
    await this.watchlistService.deleteByFilmId(filmId);
    this.noContent(res, film);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);
    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  public async getPromo(
    {user}: Request,
    res: Response
  ): Promise<void> {
    const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
    const film = await this.filmService.findPromo(watchlist);
    this.ok(res, fillDTO(FilmResponse, film));
  }

  public async uploadPreviewImage(req: Request<core.ParamsDictionary | ParamsGetFilm>, res: Response) {
    const {filmId} = req.params;
    const updateDto = { previewVideoImage: req.file?.filename };
    await this.filmService.updateById(filmId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageResponse, {updateDto}));
  }

  public async uploadPosterImage(req: Request<core.ParamsDictionary | ParamsGetFilm>, res: Response) {
    const {filmId} = req.params;
    const updateDto = { posterImage: req.file?.filename };
    await this.filmService.updateById(filmId, updateDto);
    this.created(res, fillDTO(UploadPosterImageResponse, {updateDto}));
  }

  public async uploadBackgroundImage(req: Request<core.ParamsDictionary | ParamsGetFilm>, res: Response) {
    const {filmId} = req.params;
    const updateDto = { backgroundImage: req.file?.filename };
    await this.filmService.updateById(filmId, updateDto);
    this.created(res, fillDTO(UploadBackgroundImageResponse, {updateDto}));
  }
}
