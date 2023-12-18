import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import {
  renderMovies,
  enableModal,
  fetchMovieById,
  btnWatched,
  escKey,
} from './functions';
import { paginationLT } from './pagination-function';

localStorage.removeItem('total-results-from-search');
const gallery = document.querySelector('.gallery');
const btnWatch = document.querySelector('.watch');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.spiner-cont');
let movieId = 0;

export let selectedBySearch = 0;
export let string = '';

let totalPageSearch = 0;
let page = 1;
let pageSearch = 1;

const getTrendingMovies = async () => {
  loader.classList.toggle('hidden');
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;

  renderMovies(movies);
  enableModal(false);

  gallery.addEventListener('click', e => {
    if (e.target.nodeName == 'IMG') {
      movieId = e.target.id;
      fetchMovieById(movieId);
      document.addEventListener('keyup', escKey);
    }
  });

  loader.classList.toggle('hidden');
};

btnSubmit.addEventListener('click', async e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  string = inputSearch.value.trim();
  const data = await fetchBySearch(string, pageSearch);
  if (data == undefined) {
    loader.classList.toggle('hidden');
    return;
  }
  const { results: movies, total_results } = data;
  totalPageSearch = data.total_results;
  const pageString = JSON.stringify(total_results); //convierto en string
  localStorage.setItem('total-results-from-search', pageString);
  renderMovies(movies);
  enableModal(true);
  selectedBySearch = 1;
  loader.classList.toggle('hidden');
});

btnWatch.addEventListener('click', () => {
  btnWatched(movieId);
});

getTrendingMovies();
