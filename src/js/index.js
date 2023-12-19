import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import {
  renderMovies,
  enableModal,
  fetchMovieById,
  btnWatched,
  btnQueued
} from './functions';
import { paginationLT } from './pagination-function';



const gallery = document.querySelector('.gallery');
const btnWatch = document.querySelector('.watch');
const btnQueue = document.querySelector('.queue');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.spiner-cont');
let movieId = 0;

export let selectedBySearch = 0;
export let string = '';

let totalPageSearch = 0;
let page = 1;
let pageSearch = 1;
let moviesCount = JSON.parse(localStorage.getItem('movies'))


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

btnQueue.addEventListener('click', () => {
  btnQueued(movieId);
});

getTrendingMovies();
