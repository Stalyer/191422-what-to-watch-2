export default class UpdateFilmDto {
  public name?: string;

  public description?: string;

  public publictionDate?: string;

  public genre?: string;

  public released?: number;

  public previewVideoImage?: string;

  public previewVideoLink?: string;

  public videoLink!: string;

  public starring?: string[];

  public director?: string;

  public runTime?: number;

  public posterImage?: string;

  public backgroundImage?: string;

  public backgroundColor?: string;

  public isPromo?: boolean;
}
