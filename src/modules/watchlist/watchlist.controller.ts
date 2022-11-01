import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';
import FilmResponse from '../film/response/film.response.js';
import {FilmServiceInterface} from '../film/film-service.interface.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';

type ParamsGetFilm = {
  filmId: string;
}

@injectable()
export default class WatchlistController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface
  ) {
    super(logger, configService);
    this.logger.info('Register routes for WatchlistController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.filmService, 'films', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.filmService, 'films', 'filmId')
      ]
    });
  }

  public async index(
    {user}: Request,
    res: Response
  ): Promise<void> {
    const films = await this.watchlistService.find(user.id);
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async create(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFilm, object, CreateWatchlistDto>,
    res: Response
  ): Promise<void> {
    const result = await this.watchlistService.create({userId: user.id, filmId: params.filmId});
    const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
    const film = await this.filmService.findById(String(result.filmId), watchlist);
    this.created(res, fillDTO(FilmResponse, film));
  }

  public async delete(
    {params, user}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const result = await this.watchlistService.deleteById(user.id, params.filmId);
    if (result) {
      const watchlist = user ? await this.watchlistService.findIds(user.id) : [];
      const film = await this.filmService.findById(String(result.filmId), watchlist);
      this.created(res, fillDTO(FilmResponse, film));
    } else {
      this.noContent(res, result);
    }
  }
}
