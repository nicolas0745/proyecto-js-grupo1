import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import { renderMovies, enableModal } from './functions';
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.dot-spinner');
let page = 1;
let pageSearch = 1;

const getTrendingMovies = async () => {
  loader.classList.toggle('hidden');
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;

  renderMovies(movies);
  loader.classList.toggle('hidden');

  enableModal(false);

  // (() => {
  //   const refs = {
  //     openModalBtn: document.querySelectorAll('.data-modal-open'),
  //     closeModalBtn: document.querySelector('[data-modal-close]'),
  //     modal: document.querySelector('[data-modal]'),
  //   };

  //   refs.openModalBtn.forEach(element => {
  //     element.addEventListener('click', toggleModal);
  //   });
  //   refs.closeModalBtn.addEventListener('click', toggleModal);

  //   function toggleModal() {
  //     refs.modal.classList.toggle('is-hidden');
  //   }
  // })();
  gallery.addEventListener('click', e => {
    let movieId = e.target.id;
    //tenemos el id de la imagen seleccionada
    fetchMovieById(movieId);
  });
};

btnSubmit.addEventListener('click', async e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  const string = inputSearch.value;
  string.trim();
  console.log(string);
  const data = await fetchBySearch(string, pageSearch);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  renderMovies(movies);
  enableModal(true);
  // console.log(total_pages);
  loader.classList.toggle('hidden');
  gallery.addEventListener('click', e => {
    let movieId = e.target.id;
    //tenemos el id de la imagen seleccionada
    fetchMovieById(movieId);
  });
});

const fetchMovieById = async id => {
  const data = await fetchById(id);
  // console.log(data);

  const movieTitle = document.querySelector('.modal-title');
  movieTitle.textContent = data.original_title.toUpperCase();
  const results = document.querySelector('.results');
  const review = document.querySelector('.abouttext');
  const imgModal = document.querySelector('.img-modal');

  let movieGen = [];
  data.genres.forEach(element => {
    movieGen.push(' ' + element.name);
  });
  results.innerHTML = `<li><span class="span">${data.vote_average}</span> / ${data.vote_count}</li>
                                    <li>${data.popularity}</li>
                                    <li>${data.original_title}</li>
                                    <li>${movieGen}</li>`;

  review.textContent = data.overview;
  imgModal.src = `https://image.tmdb.org/t/p/w200${data.poster_path}`;
};

getTrendingMovies();
