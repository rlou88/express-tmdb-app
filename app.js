require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>
  console.log(`App is up and running listening on port ${PORT}`)
);

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

app.get('/contact-us', (req, res, next) => {
  res.render('contact-us');
});

app.get('/something', (req, res, next) => {
  res.json({ hello: 'world' });
});

app.get('/popular-movies', async (req, res) => {
  console.log(process.env.TMDB_API_KEY);

  const data = await tmdbApi('movie/popular');
  console.log(data.results);
  const movies = data.results;

  res.render('movies', {
    movies: movies
  });
});

app.get('/movies/:id', async (req, res) => {
  console.log('******');
  console.log(req.params);
  console.log('******');

  const movieId = req.params.id;

  const data = await tmdbApi(`movie/${movieId}`);
  console.log('&&&&&&&&&');
  console.log(data);

  res.render('movie', {
    movie: data
  });
});

async function tmdbApi(pathParams) {
  try {
    const url = `https://api.themoviedb.org/3/${pathParams}`;

    console.log(`api endpoint: ${url}`);

    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(url, {
      params: {
        api_key: apiKey
      }
    });

    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error('API request to TMDb failed');
  }
}
