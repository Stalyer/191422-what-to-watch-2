import {IsString, Length, IsOptional} from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({message: 'name is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public name!: string;

  @IsOptional()
  @IsString({message: 'avatarPath is required'})
  public avatarPath?: string;
}
