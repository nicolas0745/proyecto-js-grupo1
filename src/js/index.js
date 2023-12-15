import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import {
  renderMovies,
  enableModal,
  fetchMovieById,
  btnWatched,
} from './functions';
const gallery = document.querySelector('.gallery');
const btnWatch = document.querySelector('.watch');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.spiner-cont');
let movieId = 0;

let page = 1;
let pageSearch = 1;
console.log(JSON.parse(localStorage.getItem('movies')));

const getTrendingMovies = async () => {
  loader.classList.toggle('hidden');
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;

  renderMovies(movies);
  loader.classList.toggle('hidden');

  enableModal(false);

  gallery.addEventListener('click', e => {
    movieId = e.target.id;

    //tenemos el id de la imagen seleccionada
    if (movieId != '') {
      fetchMovieById(movieId);
    }
  });
};

btnSubmit.addEventListener('click', async e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  const string = inputSearch.value.trim();
  console.log(string);
  const data = await fetchBySearch(string, pageSearch);
  if (data == undefined) {
    loader.classList.toggle('hidden');
    return;
  }
  const { results: movies, total_pages } = data;
  renderMovies(movies);
  enableModal(true);
  loader.classList.toggle('hidden');
});

btnWatch.addEventListener('click', () => {
  btnWatched(movieId);
});

getTrendingMovies();
