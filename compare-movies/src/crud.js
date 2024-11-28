import defaultMovies from '../public/movie-data.json';
import {
  setLocalStorageKey,
  getLocalStorageKey
} from './data-store.js';

const getMovies = () => {
  return getLocalStorageKey('data');
}

const setMovies = (movies) => {
  setLocalStorageKey('data', movies);
}

const initMoviesIfEmpty = () => {
  const currMovies = getMovies();
  if (currMovies === null) {
    setMovies(defaultMovies);
    currMovies =  defaultMovies;
  }
}

const addMovies = (movies) => {
  const currMovies = getMovies();
  currMovies.unshift(movies);
  setMovies(currMovies);
}

const removeMovies = (moviesUUID) => {
  const currMovies = getMovies();
  const removeIndex = currMovies.findIndex(movies => movies.uuid === moviesUUID);
  currMovies.splice(removeIndex, 1);
  setMovies(currMovies);
  displayMovies();
}

export {
  removeMovies,
  addMovies,
  initMoviesIfEmpty,
  setMovies,
  getMovies
}