export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = 'review',
  Player = '/player',
  Register = '/register',
  EditFilm = 'edit',
  AddFilm = '/create',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const GENRES = ['comedy', 'crime', 'documentary', 'drama', 'horror', 'family', 'romance', 'scifi', 'thriller'];

export const DEFAULT_GENRE = 'All genres';

export enum APIRoute {
  Films = '/films',
  Similar = '/films',
  Promo = '/films/promo',
  Favorite = '/watchlist',
  Comments = '/comments',
  User = '/users',
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/register',
  Add = '/films',
  Genre = '/films/genre',
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  SimilarFilms = 'SIMILAR FILMS',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  User = 'USER',
  FavoriteFilms = 'FAVORITE FILMS',
  Genre = 'GENRE',
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}
