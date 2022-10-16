import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
// import HttpError from '../../common/errors/http-error.js';
// import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import FilmResponse from '../film/response/film.response.js';

@injectable()
export default class WatchlistController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for WatchlistController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
  }

  public async index(
    _req: Request,
    res: Response
  ): Promise<void> {
    const films = await this.watchlistService.find();
    this.ok(res, fillDTO(FilmResponse, films));
  }
}
