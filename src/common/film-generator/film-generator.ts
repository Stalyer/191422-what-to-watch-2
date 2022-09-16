import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';

const FIRST_MONTH = 1;
const LAST_MONTH = 12;
const MIN_RUN_TIME = 25;
const MAX_RUN_TIME = 180;
const MIN_RATING = 1;
const MAX_RATING = 10;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 100;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const publictionDate = dayjs().subtract(generateRandomValue(FIRST_MONTH, LAST_MONTH), 'month').toISOString();
    const genre = getRandomItem([
      FilmGenre.comedy,
      FilmGenre.crime,
      FilmGenre.documentary,
      FilmGenre.drama,
      FilmGenre.family,
      FilmGenre.horror,
      FilmGenre.romance,
      FilmGenre.scifi,
      FilmGenre.thriller
    ]);
    const released = getRandomItem<number>(this.mockData.released);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const previewVideoImage = getRandomItem<string>(this.mockData.previewVideoImage);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLink);
    const starring =  getRandomItems<string>(this.mockData.starring).join(';');
    const director = getRandomItem<string>(this.mockData.director);
    const runTime = generateRandomValue(MIN_RUN_TIME, MAX_RUN_TIME);
    const commentCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const posterImage = getRandomItem<string>(this.mockData.posterImage);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImage);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);
    const userName = getRandomItem<string>(this.mockData.userName);
    const userEmail = getRandomItem<string>(this.mockData.userEmail);
    const userAvatar = getRandomItem<string>(this.mockData.userAvatar);

    return [
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
      userEmail,
      userAvatar
    ].join('\t');
  }
}
