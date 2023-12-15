import { fetchById } from './fetch-functions';
const btnWatch = document.querySelector('.watch');
const gallery = document.querySelector('.gallery');

const moviesGenre = [
  { number: 28, genre: 'Action' },
  { number: 12, genre: 'Adventure' },
  { number: 16, genre: 'Animation' },
  { number: 35, genre: 'Comedy' },
  { number: 80, genre: 'Crime' },
  { number: 99, genre: 'Documentary' },
  { number: 18, genre: 'Drama' },
  { number: 10751, genre: 'Family' },
  { number: 14, genre: 'Fantasy' },
  { number: 36, genre: 'History' },
  { number: 27, genre: 'Horror' },
  { number: 10402, genre: 'Music' },
  { number: 9648, genre: 'Mystery' },
  { number: 10749, genre: 'Romance' },
  { number: 878, genre: 'Science Fiction' },
  { number: 10770, genre: 'TV Movie' },
  { number: 53, genre: 'Thriller' },
  { number: 10752, genre: 'War' },
  { number: 37, genre: 'Western' },
];

// funcion para encontrar los generos de una pelicula

export function findGender(data) {
  const genreArray = [];
  data.forEach(elementData => {
    moviesGenre.forEach(elementGenre => {
      if (elementData == elementGenre.number) {
        genreArray.push(' ' + elementGenre.genre);
      }
    });
  });
  return genreArray;
}

// Funcion para renderizar las peliculas en gallery

export function renderMovies(movies) {
  let htmlcode = '';
  let imgSrcr = '';
  movies.forEach(movie => {
    // console.log(movie);
    let year = movie.release_date.substr(0, 4);
    let genreText = findGender(movie.genre_ids);
    if (movie.poster_path == null)
      imgSrcr = `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg`;
    else imgSrcr = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    let titleUppercase = movie.title.toUpperCase();
    htmlcode += `<div class="photo-card">
                                  <img class="galleryimage data-modal-open" id="${movie.id}"src="${imgSrcr}" alt="${movie.title}" loading="lazy" />
                                  <div class="info">
                                    <p class="info-item"> 
                                      <b>${titleUppercase}</b>
                                    </p>
                                    <p class="info-item orange-text">
                                      <b>${genreText} | ${year}</b>
                                    </p>
                                 </div>
                               </div>`;
  });
  gallery.innerHTML = htmlcode;
}
const body = document.querySelector('body');
export function enableModal(param) {
  const refs = {
    openModalBtn: document.querySelectorAll('.data-modal-open'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.forEach(element => {
    element.addEventListener('click', toggleModal);
  });
  if (!param) {
    refs.closeModalBtn.addEventListener('click', toggleModal);
    console.log('agrega listenner');
  }

  body.addEventListener('keyup', e => {
    if (e.key == 'Escape') {
      refs.modal.classList.add('is-hidden');
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
}

export const fetchMovieById = async id => {
  const spinerCont = document.querySelector('.spiner-container');
  spinerCont.classList.toggle('hidden');
  console.log('enable modal');
  const data = await fetchById(id);
  if (data == undefined) return;
  let isWatched = false;
  const getMovies = JSON.parse(localStorage.getItem('movies'));
  if (getMovies !== null) {
    getMovies.forEach(movie => {
      if (movie.id == id) {
        isWatched = true;
      }
    });
  }
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
  if (isWatched) {
    btnWatch.textContent = 'Remove';
    btnWatch.classList.add('watched');
    spinerCont.classList.toggle('hidden');
    return;
  }
  btnWatch.textContent = 'add to watched';
  if (btnWatch.classList.contains('watched'))
    btnWatch.classList.remove('watched');
  spinerCont.classList.toggle('hidden');
};

export async function btnWatched(movieId) {
  console.log(movieId);
  if (movieId == 0) return;
  const dataToSave = {};
  const data = await fetchById(movieId);
  if (data == undefined) return;
  dataToSave.release_date = data.release_date;
  dataToSave.genre_ids = data.genres.map(data => data.id);

  console.log(dataToSave.genre_ids);
  dataToSave.id = movieId;
  dataToSave.poster_path = data.poster_path;
  dataToSave.title = data.title;

  const getMovies = JSON.parse(localStorage.getItem('movies'));

  let isInLocalStorage = false;
  if (getMovies == null) {
    localStorage.setItem('movies', JSON.stringify([dataToSave]));
    btnWatch.textContent = 'Remove';
    btnWatch.classList.add('watched');
    return;
  }
  getMovies.forEach(movie => {
    if (movie.id == dataToSave.id) {
      isInLocalStorage = true;
      let index = getMovies.findIndex(elem => elem.id == dataToSave.id);
      getMovies.splice(index, 1);
      localStorage.setItem('movies', JSON.stringify(getMovies));
      btnWatch.textContent = 'add to watched';
      btnWatch.classList.remove('watched');
    }
  });
  if (!isInLocalStorage) {
    getMovies.push(dataToSave);
    localStorage.setItem('movies', JSON.stringify(getMovies));
    btnWatch.textContent = 'Remove';
    btnWatch.classList.add('watched');
  }
}
