export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  FilmServiceInterface: Symbol.for('FilmServiceInterface'),
  FilmModel: Symbol.for('FilmModel'),
  CommentModel: Symbol.for('CommentModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  WatchlistModel: Symbol.for('WatchlistModel'),
  WatchlistServiceInterface: Symbol.for('WatchlistServiceInterface'),
  FilmController: Symbol.for('FilmController'),
  UserController: Symbol.for('UserController'),
  CommentController: Symbol.for('CommentController'),
  WatchlistController: Symbol.for('WatchlistController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
