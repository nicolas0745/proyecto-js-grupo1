import {
  renderMovies,
  fetchMovieById,
  enableModal,
  btnWatched,
} from './functions';

const btnW = document.querySelector('.btn-watched');
const btnQ = document.querySelector('.btn-queue');
const gallery = document.querySelector('.gallery');
const btnWatchModal = document.querySelector('.watch');
let movieId = 0;

const renderFavoriteMovies = firstTime => {
  console.log(firstTime);
  btnW.style.background = 'rgba(255, 107, 8, 1)';
  btnQ.style.background = 'transparent';

  //aqui la funcion llamando a las peliculas vistas o guardadas
  const moviesToRender = JSON.parse(localStorage.getItem('movies'));
  if (moviesToRender !== null) {
    renderMovies(moviesToRender);
    if (firstTime) {
      enableModal(false);
      gallery.addEventListener('click', e => {
        movieId = e.target.id;
        console.log(movieId);
        //tenemos el id de la imagen seleccionada
        if (movieId != '') {
          fetchMovieById(movieId);
        }
      });
    } else {
      enableModal(true);
    }
  }
};

btnQ.addEventListener('click', e => {
  btnQ.style.background = 'rgba(255, 107, 8, 1)';
  btnW.style.background = 'transparent';

  //aqui la funcion llamando a las peliculas en cola
});

btnW.addEventListener('click', () => {
  renderFavoriteMovies(false);
});
btnWatchModal.addEventListener('click', async () => {
  await btnWatched(movieId);
  renderFavoriteMovies();
});
document.addEventListener('DOMContentLoaded', () => {
  renderFavoriteMovies(true);
});
