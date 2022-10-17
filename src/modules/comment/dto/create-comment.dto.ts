import {
  IsMongoId,
  IsString,
  Length,
  IsOptional,
  IsInt,
  Min,
  Max
} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'rating must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(10, {message: 'Maximum rating is 10'})
  public rating!: number;

  @IsOptional()
  @IsMongoId({message: 'filmId field must be a valid id'})
  public filmId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
