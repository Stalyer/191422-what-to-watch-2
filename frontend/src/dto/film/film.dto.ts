import UserDto from '../../dto/user/user.dto';

export default class FilmDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public publictionDate!: string;

  public genre!: string;

  public released!: number;

  public rating!: number;

  public previewVideoImage!: string;

  public previewVideoLink!: string;

  public videoLink!: string;

  public starring!: string[];

  public director!: string;

  public runTime!: number;

  public commentCount!: number;

  public posterImage!: string;

  public backgroundImage!: string;

  public backgroundColor!: string;

  public user!: UserDto;

  public isPromo!: boolean;

  public isWatchlist!: boolean;
}
