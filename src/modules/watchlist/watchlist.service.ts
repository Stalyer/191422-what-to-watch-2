import {inject, injectable} from 'inversify';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import CreateWatchlistDto from './dto/create-watchlist.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {WatchlistEntity} from './watchlist.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';

@injectable()
export default class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) {}

  public async create(dto: CreateWatchlistDto): Promise<DocumentType<WatchlistEntity>> {
    const result = await this.watchlistModel.create(dto);
    this.logger.info(`New watchlist created to: ${dto.userId}`);

    return result;
  }
}
