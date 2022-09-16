import { FilmGenre } from '../types/film-genre.enum.js';
import { Film } from '../types/film.type.js';

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
