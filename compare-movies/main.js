import defaultMovies from '../movie-data.json';

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key) => {
  try {
    const fetch = JSON.parse(localStorage.getItem(key))
    return (fetch.length === 0) ? null : fetch;
  } catch (err) {
    console.error('JSON parse error!', err);
    return null;
  }
}

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
  currMovies.unshift(movies);
  setMovies(currMovies);
}

const removeMovies = (moviesUUID) => {
  const removeIndex = currMovies.findIndex(movies => movies.uuid === moviesUUID);
  currMovies.splice(removeIndex, 1);
  setMovies(currMovies);
  displayMovies();
}

const handleSubmit = (event) => {
  event.preventDefault();
  const movie = {
    title: event.target.movieTitle.value,
    criticScore: event.target.criticScore.value,
    audienceScore: event.target.audienceScore.value,
    domestic: event.target.domesticGrossSales.value,
    genre: event.target.genres.value
  }

  event.target.reset();
  addMovies(movie);
  displayMovies();
}

const handleReset = () => {
  setMovies(defaultMovies);
  currMovies = defaultMovies;  
  displayMovies();
}

const displayMovies = () => {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';

  currMovies.forEach(movie => {
    const li = document.createElement('li');
    // title
    const h2 = document.createElement('h2');
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
    domesticTotal.textContent = `Domestic Total: $${movie.domestic}`; 
    li.append(domesticTotal);
    // genre
    const genre = document.createElement('p');
    genre.textContent = `Genre: ${movie.genre}`; 
    li.append(genre);

    // append to list
    ul.append(li);
  })
}

// state var
let currMovies;

const main = () => {
  initMoviesIfEmpty();

  // form listener
  document
    .querySelector('form')
    .addEventListener('submit', handleSubmit);
  // reset listener
  document
    .querySelector('button#default-movies')
    .addEventListener('click', handleReset);

  console.log('here without any problems!')
  console.log('logging movies', getMovies());

  console.log('displaying movies now:');
  displayMovies();
}

main();