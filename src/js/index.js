import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import { renderMovies, enableModal, findGender } from './functions';
const gallery = document.querySelector('.gallery');
const btnWatch = document.querySelector('.watch');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.dot-spinner');
let page = 1;
let pageSearch = 1;
console.log(JSON.parse(localStorage.getItem('movies')));

const dataToSave = {
  release_date: '',
  genre_ids: '',
  poster_path: '',
  title: '',
  id: '',
};
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
  const string = inputSearch.value.trim();
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
  if (data == undefined) return;
  // console.log(data);
  // console.log(data.genres);
  dataToSave.release_date = data.release_date;
  dataToSave.genre_ids = data.genres.map(data => data.id);

  console.log(dataToSave.genre_ids);
  dataToSave.id = id;
  dataToSave.poster_path = data.poster_path;
  dataToSave.title = data.title;
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

btnWatch.addEventListener('click', () => {
  const getMovies = JSON.parse(localStorage.getItem('movies'));
  if (getMovies == null) {
    localStorage.setItem('movies', JSON.stringify([dataToSave]));
    return;
  }
  getMovies.push(dataToSave);
  localStorage.setItem('movies', JSON.stringify(getMovies));
  console.log(getMovies, 'movies');
});
const addToLocalStorage = data => {};

getTrendingMovies();
