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
  @prop({
    trim: true,
    required: true
  })
  public name!: string;

  @prop({
    trim: true,
    required: true
  })
  public description!: string;

  @prop({required: true})
  public publictionDate!: Date;

  @prop({
    type: () => String,
    enum: FilmGenre,
    required: true
  })
  public genre!: FilmGenre;

  @prop({required: true})
  public released!: number;

  @prop({default: 0})
  public rating!: number;

  @prop({default: ''})
  public previewVideoImage!: string;

  @prop({required: true})
  public previewVideoLink!: string;

  @prop({required: true})
  public videoLink!: string;

  @prop({required: true})
  public starring!: string[];

  @prop({required: true})
  public director!: string;

  @prop({required: true})
  public runTime!: number;

  @prop({default: 0})
  public commentCount!: number;

  @prop({default: ''})
  public posterImage!: string;

  @prop({default: ''})
  public backgroundImage!: string;

  @prop({required: true})
  public backgroundColor!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: false})
  public isPromo!: boolean;
}

export const FilmModel = getModelForClass(FilmEntity);
