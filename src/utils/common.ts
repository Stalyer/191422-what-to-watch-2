import crypto from 'crypto';
import {plainToInstance, ClassConstructor} from 'class-transformer';
import {FilmGenre} from '../types/film-genre.enum.js';
import {Film} from '../types/film.type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
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
  ] = tokens;

  return {
    name,
    description,
    publictionDate: new Date(publictionDate),
    genre: FilmGenre[genre as 'comedy' | 'crime' | 'documentary' | 'drama' | 'horror' | 'family' | 'romance' | 'scifi' | 'thriller'],
    released: Number.parseInt(released, 10),
    rating: Number.parseFloat(rating),
    previewVideoImage,
    previewVideoLink,
    starring: starring.split(';'),
    director,
    runTime: Number.parseInt(runTime, 10),
    commentCount: Number.parseInt(commentCount, 10),
    posterImage,
    backgroundImage,
    backgroundColor,
    user: {
      name: userName,
      email: useEmail,
      avatarPath: userAvatarPath,
    },
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
