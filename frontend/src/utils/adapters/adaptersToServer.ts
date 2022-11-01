import {NewReview} from '../../types/new-review';
import {NewUser} from '../../types/new-user';
import {NewFilm} from '../../types/new-film';
import {FilmEdit} from '../../types/film';
import CreateFilmDto from '../../dto/film/create-film.dto';
import UpdateFilmDto from '../../dto/film/update-film.dto';
import CreateCommentDto from '../../dto/comment/create-comment.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import {getTime} from '../utils';

export const adaptSignupToServer =
  (user: NewUser): CreateUserDto => ({
    name: user.name,
    email: user.email,
    avatarPath: ' ',
    password: user.password,
  });

export const adaptCreateFilmToServer =
  (film: NewFilm): CreateFilmDto => ({
    name: film.name,
    description: film.description,
    publictionDate: getTime(),
    genre: film.genre,
    released: film.released,
    previewVideoLink: film.previewVideoLink,
    videoLink: film.videoLink,
    starring: film.starring,
    director: film.director,
    runTime: film.runTime,
    backgroundColor: film.backgroundColor,
    isPromo: false,
  });

export const adaptUpdateFilmToServer =
  (film: FilmEdit): UpdateFilmDto => ({
    name: film.name,
    description: film.description,
    publictionDate: getTime(),
    genre: film.genre,
    released: film.released,
    previewVideoLink: film.previewVideoLink,
    videoLink: film.videoLink,
    starring: film.starring,
    director: film.director,
    runTime: film.runTime,
    backgroundColor: film.backgroundColor,
    isPromo: false,
  });

export const adaptCreateCommentToServer =
(comment: NewReview): CreateCommentDto => ({
  text: comment.comment,
  rating: comment.rating
});

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };

export const adaptImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('image', file);

    return formData;
  };
