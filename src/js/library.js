import {
  renderMovies,
  fetchMovieById,
  enableModal,
  btnWatched,
  escKey,
} from './functions';

const btnW = document.querySelector('.btn-watched');
const btnQ = document.querySelector('.btn-queue');
const gallery = document.querySelector('.gallery');
const btnWatchModal = document.querySelector('.watch');
let movieId = 0;

const renderFavoriteMovies = firstTime => {
  btnW.style.background = 'rgba(255, 107, 8, 1)';
  btnQ.style.background = 'transparent';

  //aqui la funcion llamando a las peliculas vistas o guardadas
  const moviesToRender = JSON.parse(localStorage.getItem('movies'));
  if (moviesToRender !== null) {
    renderMovies(moviesToRender);
    if (firstTime) {
      enableModal(false);
      gallery.addEventListener('click', e => {
        if (e.target.nodeName == 'IMG') {
          movieId = e.target.id;
          fetchMovieById(movieId);
          document.addEventListener('keyup', escKey);
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
  renderFavoriteMovies(false);
});
document.addEventListener('DOMContentLoaded', () => {
  renderFavoriteMovies(true);
});
