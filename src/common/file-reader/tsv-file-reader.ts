import { readFileSync } from 'fs';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        name,
        description,
        publictionDate,
        genre,
        released,
        rating,
        previewVideoImage,
        previewVideoLink,
        starring,
        director,
        runTime,
        commentCount,
        posterImage,
        backgroundImage,
        backgroundColor,
        userName,
        useEmail,
        userAvatarPath
      ]) => ({
        name,
        description,
        publictionDate: new Date(publictionDate),
        genre: FilmGenre[genre as 'comedy' | 'crime' | 'documentary' | 'drama' | 'horror' | 'family' | 'romance' | 'scifi' | 'thriller'],
        released: parseInt(released, 10),
        rating: parseFloat(rating),
        previewVideoImage,
        previewVideoLink,
        starring: starring.split(';'),
        director,
        runTime: parseInt(runTime, 10),
        commentCount: parseInt(commentCount, 10),
        posterImage,
        backgroundImage,
        backgroundColor,
        user: {
          name: userName,
          email: useEmail,
          avatarPath: userAvatarPath,
        },
      }));
  }
}
