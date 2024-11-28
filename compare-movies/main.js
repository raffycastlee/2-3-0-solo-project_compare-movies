import { initMoviesIfEmpty } from './src/crud.js';
import {
  displayMain,
  initNav,
} from './src/dom-helpers.js';

const main = () => {
  initMoviesIfEmpty();
  initNav();
  displayMain();
}

main();