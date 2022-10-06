import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {FilmGenre} from '../../types/film-genre.enum.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public name!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public publictionDate!: Date;

  @prop({
    type: () => String,
    enum: FilmGenre
  })
  public genre!: FilmGenre;

  @prop()
  public released!: number;

  @prop()
  public rating!: number;

  @prop()
  public previewVideoImage!: string;

  @prop()
  public previewVideoLink!: string;

  @prop()
  public starring!: string[];

  @prop()
  public director!: string;

  @prop()
  public runTime!: number;

  @prop({default: 0})
  public commentCount!: number;

  @prop()
  public posterImage!: string;

  @prop()
  public backgroundImage!: string;

  @prop()
  public backgroundColor!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const FilmModel = getModelForClass(FilmEntity);
