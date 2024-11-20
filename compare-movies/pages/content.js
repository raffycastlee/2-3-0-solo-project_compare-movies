import Chart from 'chart.js/auto';
import { getMovies } from '../src/crud.js';

// Chart.js
const makeChart = (movies, type) => {
  if (type === 'bar') {
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
    return;
  }

  if (type === 'donut') {
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

  if (type === 'scatter') {
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
}

const main = () => {
  const section = document.querySelector('section');
  section.style.flexDirection = 'column';

  switch (section.id) {
    case 'bar':
      section.innerHTML = `
        <h2 id="bar-heading">Domestic Box Office</h2>
        <canvas id="bar-chart" aria-label="bar-chart"></canvas>
        `;
      makeChart(getMovies(), 'bar');
      break;
    case 'donut':
      section.innerHTML = `
        <h2 id="donut-heading">Genres and Total Gross</h2>
        <canvas id="donut-chart" aria-label="donut-chart"></canvas>
        `;
      makeChart(getMovies(), 'donut');
      break;
    case 'scatter':
      section.innerHTML = `
        <h2 id="scatter-heading">Critic vs Audience Score</h2>
        <canvas id="scatter-chart" aria-label="scatter-chart"></canvas>
        `;
      makeChart(getMovies(), 'scatter');
      break;
  }
}

main();