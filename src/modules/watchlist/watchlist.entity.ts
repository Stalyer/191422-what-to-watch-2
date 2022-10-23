import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {FilmEntity} from '../film/film.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface WatchlistEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'watchlist'
  }
})

export class WatchlistEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: FilmEntity,
    required: true
  })
  public filmId!: Ref<FilmEntity>;
}

export const WatchlistModel = getModelForClass(WatchlistEntity);
