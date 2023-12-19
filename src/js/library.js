import {
  renderMovies,
  fetchMovieById,
  enableModal,
  btnWatched,
  findGender,
  btnQueued
} from './functions';
import { paginationLT } from './pagination-function';

const btnW = document.querySelector('.btn-watched');
const btnQ = document.querySelector('.btn-queue');
const gallery = document.querySelector('.gallery');
const btnWatchModal = document.querySelector('.watch');
const btnQueueModal = document.querySelector('.queue');

let movieId = 0;

const refs = {
  listado: document.querySelector('.pagnumber'),
  botonAtras: document.getElementById('atras'),
  botonSiguiente: document.getElementById('siguiente'),
  pageOne: document.getElementById('primera'),
  pageFinal: document.getElementById('ultima'),
};



let totalItems;
let currentPage=1;
let moviesToRender = {}



//---------------------------------------------------------------------------------------///

function renderWatchedMovies(peliculas) {

    let htmlcode = '';
    let imgSrcr = '';

    peliculas.forEach(movie => {
      // console.log(movie);
      if (movie.page == currentPage) { 
      let year = movie.release_date.substr(0, 4);
      let genreText = findGender(movie.genre_ids);
      if (movie.poster_path == null)
        imgSrcr = `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg`;
      else imgSrcr = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
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
      }
    });
  gallery.innerHTML = htmlcode;
  enableModal(false);
   gallery.addEventListener('click', e => {
        movieId = e.target.id;
        console.log(movieId);
        //tenemos el id de la imagen seleccionada
     if (movieId != '') {
       fetchMovieById(movieId)
                    
        }
   });
  
}

let selectedQue = 0

btnQ.addEventListener('click', e => {
  selectedQue = 1
  btnQ.style.background = 'rgba(255, 107, 8, 1)';
  btnW.style.background = 'transparent';
  currentPage = 1
  moviesToRender = JSON.parse(localStorage.getItem('movies-que'));
  addPage(moviesToRender)
  moviescount = moviesToRender.length
  renderLibraryPagination(paginationLT(moviescount,currentPage))
  renderWatchedMovies(moviesToRender);
  //aqui la funcion llamando a las peliculas en cola
});

btnW.addEventListener('click', () => {
  selectedQue = 0
  btnW.style.background = 'rgba(255, 107, 8, 1)';
  btnQ.style.background = 'transparent';
  currentPage = 1
  moviesToRender = JSON.parse(localStorage.getItem('movies'));
  addPage(moviesToRender)
  moviescount = moviesToRender.length
  renderLibraryPagination(paginationLT(moviescount,currentPage))
  renderWatchedMovies(moviesToRender);
});

btnWatchModal.addEventListener('click', async () => {
  await btnWatched(movieId);
  moviesToRender = JSON.parse(localStorage.getItem('movies'));
  addPage(moviesToRender)
  renderWatchedMovies(moviesToRender);
  renderLibraryPagination(paginationLT(moviescount,currentPage))
});

btnQueueModal.addEventListener('click', async () => {
  await btnQueued(movieId);
  moviesToRender = JSON.parse(localStorage.getItem('movies-que'));
  addPage(moviesToRender)
  renderWatchedMovies(moviesToRender);
  renderLibraryPagination(paginationLT(moviescount,currentPage))
});


document.addEventListener('DOMContentLoaded', () => {
  currentPage = 1
  moviesToRender = JSON.parse(localStorage.getItem('movies'));
  addPage(moviesToRender)
  moviescount = moviesToRender.length
  renderLibraryPagination(paginationLT(moviescount,currentPage))
  renderWatchedMovies(moviesToRender);
  //aca poner pagination 

});


/////--------------------------------------------------------------------------------/////

let countMovies = 0
let countPages = 1

function addPage(moviesToRender) { 

  moviesToRender.forEach(element => {
    if (countMovies == 20) {
      countPages++
      countMovies = 0
     }
    countMovies++
    element.page = countPages
    
  });
  console.log(moviesToRender)
  totalPag2 = countPages
  countMovies = 0
  countPages = 1
}

let moviescount = 0

async function renderLibraryPagination(pArray) {
  refs.listado.innerHTML = ''; // Limpiar contenido anterior
  pArray.forEach(item => {
    const link = document.createElement('button');
    
    if (item == currentPage) {
      link.classList.add('main-color')
    }

    if (item === '...') {
      link.textContent = '...';
    } else {
      link.textContent = item;
      
      link.addEventListener('click', () => {
        currentPage = item;
        renderWatchedMovies(moviesToRender, currentPage)
        renderLibraryPagination( paginationLT(moviescount, currentPage));
      });
    }
    refs.listado.appendChild(link);

    console.log(link);
  });
  
}

refs.botonAtras.addEventListener('click', async () => {
  if (currentPage > 1) {
    currentPage--;
    renderWatchedMovies(moviesToRender)
     renderLibraryPagination( paginationLT(moviescount, currentPage));
    
    //console.log(paginationResult)
  }
});
let totalPag2;

refs.botonSiguiente.addEventListener('click', async () => {
  if (currentPage < totalPag2) {
    currentPage++;
    renderWatchedMovies(moviesToRender)
    renderLibraryPagination( paginationLT(moviescount, currentPage));
    
    //console.log(paginationResult)
  }
});



