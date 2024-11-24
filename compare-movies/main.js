import {
  initMoviesIfEmpty,
  getMovies
} from './src/crud.js';
import {
  handleReset,
  handleSubmit,
  displayMain,
  initNav,
} from './src/dom-helpers.js';

const main = () => {
  initMoviesIfEmpty();

  // nav listeners
  initNav();

  // console.log('here without any problems!')
  // console.log('logging movies', getMovies());

  // console.log('displaying movies now:');
  displayMain();

  // makes bar chart
  // makeChart(getMovies(), "bar");
  // makeChart(getMovies(), "donut");
  // makeChart(getMovies(), "scatter");
}

main();