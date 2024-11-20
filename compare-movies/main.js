import {
  initMoviesIfEmpty,
  getMovies
} from './src/crud.js';
import {
  handleReset,
  handleSubmit,
  displayMovies
} from './src/events.js';

const main = () => {
  initMoviesIfEmpty();

  // form listener
  document
    // .querySelector('form')
    .addEventListener('submit', handleSubmit);
  // reset listener
  document
    .querySelector('button#default-movies')
    .addEventListener('click', handleReset);

  console.log('here without any problems!')
  console.log('logging movies', getMovies());

  console.log('displaying movies now:');
  displayMovies();

  // makes bar chart
  // makeChart(getMovies(), "bar");
  // makeChart(getMovies(), "donut");
  // makeChart(getMovies(), "scatter");
}

main();