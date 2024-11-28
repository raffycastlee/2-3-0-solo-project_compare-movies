import { initMoviesIfEmpty } from './crud.js';
import {
  displayMain,
  initNav,
} from './dom-helpers.js';

const main = () => {
  initMoviesIfEmpty();
  initNav();
  displayMain();
}

main();