import defaultMovies from '../../movie-data.json';
import {
  getMovies,
  setMovies,
  addMovies
} from './crud.js';
import Chart from 'chart.js/auto';


const initNav = () => {
  const navOptions = document.querySelector('#nav-list');
  navOptions.addEventListener('click', handleNav);
}

const handleNav = (e) => {
  switch(e.target.closest('li').id) {
    case 'nav-main':
      displayMain();
      break;
    case 'nav-bar':
      displayBar();
      break;
    case 'nav-donut':
      displayDonut();
      break;
    case 'nav-scatter':
      displayScatter();
      break;
  }
}

const displayBar = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div id="chart-container">
      <h2 id="chart-heading">Domestic Box Office</h2>
      <canvas id="bar-chart"></canvas>
    <div>
  `;
  const movies = getMovies();
  new Chart(
    document.querySelector('#bar-chart'),
    {
      type: 'bar',
      data: {
        labels: movies.map(movie => movie.title),
        datasets: [
          {
            label: 'Domestic gross by year',
            data: movies.map(movie => movie.domestic)
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return '$' + (value/1000000) + 'M';
              }
            }
          }
        }
      }
    }
  );
}

const displayDonut = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div id="chart-container">
      <h2 id="chart-heading">Genres and Total Gross</h2>
      <canvas id="donut-chart"></canvas>
    <div>
  `;
  const movies = getMovies();
  
  // TODO: sort the genres alphabetically
  let genreCounts = {};
  for (const movie of movies) {
    if (genreCounts[movie.genre]) {
      genreCounts[movie.genre] += 1;
    } else {
      genreCounts[movie.genre] = 1;
    }
  };

  // just to sort the genres alphabetically
  genreCounts = Object.entries(genreCounts).sort((a,b) => a[0] > b[0]);
  genreCounts = Object.fromEntries(genreCounts);

  // donut chart
  new Chart (
    document.querySelector('#donut-chart'),
    {
      type: 'doughnut',
      data: {
        labels: Object.keys(genreCounts),
        datasets: [{
          label: 'Genres and total gross',
          data: Object.values(genreCounts),
          backgroundColor: [
            '#65fa5b',
            '#368d9c',
            '#4c40de',
            '#360e3a',
            '#a6d413',
            '#8132fa'
          ],
          hoverOffset: 4
        }]
      }
    }
  )
}

const displayScatter = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div id="chart-container">
      <h2 id="chart-heading">Critic vs Audience Score</h2>
      <canvas id="scatter-chart"></canvas>
    <div>
  `;
  const movies = getMovies();

  // for tooltips on hover
  const movieNames = [];
  // Audience score points
  // x: audienceScore
  // y: domestic
  const audiencePoints = [];
  // Critic score Points
  // x: criticScore
  // y: domestic
  const criticPoints = [];
  for (const movie of movies) {
    // create point array for the plot
    movieNames.push(movie.title);
    audiencePoints.push({x: movie.audienceScore, y: movie.domestic});
    criticPoints.push({x: movie.criticScore, y: movie.domestic});
  }

  new Chart (
    document.querySelector('#scatter-chart'),
    {
      type: 'scatter',
      data: {
        labels: movieNames,
        datasets: [
          {
            label: 'Audience Score',
            data: audiencePoints,
            backgroundColor: '#8132fa'
          },
          {
            label: 'Critic Score',
            data: criticPoints,
            backgroundColor: '#a6d413'
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data.labels[tooltipItem.index];
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Rotten Tomatoes Score'
            }
          }, 
          y: {
            ticks: {
              callback: function(value) {
                return '$' + (value/1000000) + 'M';
              }
            },
            title: {
              display: true,
              text: 'Box Office'
            }
          }
        }
      }
    }
  )
}

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
  displayMain();
}

const handleReset = () => {
  // console.log('resetting...');
  setMovies(defaultMovies);
  displayMain();
}

const displayMain = () => {
  // gross but u gotta do what u gotta do i guess
  const main = document.querySelector('main');
  main.innerHTML = `
    <div id="left-container" aria-label="Movie Forms and List Left Container">
      <form id="add-movie-form" aria-label="Add Movie Form">
        <h2 id="form-header">Add Your Movie</h2>
        <div class="form-item" aria-label="Movie Title Input Box">
          <label for="movie-title">Movie Title:</label>
          <input id="movie-title" type="text" name="movieTitle" aria-label="Movie Title Input" required>
        </div>
        <div class="form-item" aria-label="Critic Score Input Box">
          <label for="critic-score">Critic Score:</label>
          <input id="critic-score" type="number" name="criticScore" aria-label="Critic Score Input" required>
        </div>
        <div class="form-item" aria-label="Audience Score Input Box">
          <label for="audience-score">Audience Score:</label>
          <input id="audience-score" type="number" name="audienceScore" aria-label="Audience Score Input" required>
        </div>
        <div class="form-item" aria-label="Domestic Gross Sales Input Box">
          <label for="domestic-gross-sales">Domestic Gross Sales:</label>
          <input id="domest/cic-gross-sales" type="number" name="domesticGrossSales" aria-label="Domestic Gross Sales" required>
        </div>
        <div class="form-item" aria-label="Genre Input Box">
          <label for="genre">Genre:</label>
          <select id="genres" name="genres"
          aria-label="Genre Input" required>
            <option value="">Choose a genre</option>
            <option value="comedy">Comedy</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="drama">Drama</option>
            <option value="concert">Concert</option>
            <option value="horror">Horror</option>
          </select>
        </div>
          <button id="add-movie" type="submit">Add Movie</button>
      </form>
    </div>
    <div id="right-container" aria-label="Movie Forms and List Right Container">
      <div id="movies-container" aria-label="Movies List Container">
        <ul id="movies-list">
          <!-- add li here through js -->
        </ul>
      </div>
      <button id="default-movies">Go Back To Default Movies</button>
    </div>
  `;

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

  // more atrocities
  // form listener
  document
  // .querySelector('form')
  .addEventListener('submit', handleSubmit);
  // reset listener
  document
    .querySelector('button#default-movies')
    .addEventListener('click', handleReset);
}

export {
  handleSubmit,
  handleReset,
  displayMain,
  initNav
}