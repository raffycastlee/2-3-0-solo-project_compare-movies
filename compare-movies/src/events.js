import defaultMovies from '../../movie-data.json';
import {
  getMovies,
  setMovies,
  addMovies
} from './crud.js';


const handleSubmit = (event) => {
  event.preventDefault();
  const movie = {
    title: event.target.movieTitle.value,
    criticScore: event.target.criticScore.value,
    audienceScore: event.target.audienceScore.value,
    domestic: Number(event.target.domesticGrossSales.value),
    genre: event.target.genres.value
  }

  event.target.reset();
  addMovies(movie);
  displayMovies();
}

const handleReset = () => {
  console.log('resetting...');
  setMovies(defaultMovies);
  displayMovies();
}

const displayMovies = () => {
  const ul = document.querySelector('#movies-list');
  ul.innerHTML = '';

  getMovies().forEach(movie => {
    const li = document.createElement('li');
    // title
    const h2 = document.createElement('h3');
    h2.classList.add('movie-title');
    h2.textContent = movie.title;
    li.append(h2);
    // critic score
    const criticScore = document.createElement('p');
    criticScore.textContent = `Critic Score: ${movie.criticScore}%`;
    li.append(criticScore);
    // audience score
    const audienceScore = document.createElement('p');
    audienceScore.textContent = `Audience Score: ${movie.audienceScore}%`;
    li.append(audienceScore);
    // domestic total
    const domesticTotal = document.createElement('p');
    domesticTotal.textContent = `Domestic Total: $ ${movie.domestic.toLocaleString()}`; 
    li.append(domesticTotal);
    // genre
    const genre = document.createElement('p');
    const upper = movie.genre[0].toUpperCase() + movie.genre.slice(1);
    genre.textContent = `Genre: ${upper}`; 
    li.append(genre);

    // append to list
    ul.append(li);
  })
}

export {
  handleSubmit,
  handleReset,
  displayMovies
}