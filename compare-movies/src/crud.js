import {
  setLocalStorageKey,
  getLocalStorage
} from './data-store.js';

// state var
let currMovies;

const getMovies = () => {
  return getLocalStorage('data');
}

const setMovies = (movies) => {
  setLocalStorageKey('data', movies);
}

const initMoviesIfEmpty = () => {
  // on refresh, check if local storage is empty. if it is, replace it
  // with default values from movies.json
  currMovies = getMovies();
  if (currMovies === null) {
    setMovies(defaultMovies);
    currMovies =  defaultMovies;
  }
}

const addMovies = (movies) => {
  currMovies = getMovies();
  currMovies.unshift(movies);
  setMovies(currMovies);
}

const removeMovies = (moviesUUID) => {
  currMovies = getMovies();
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