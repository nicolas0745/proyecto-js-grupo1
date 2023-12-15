import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import { renderMovies, enableModal } from './functions';
import { selectedBySearch, string } from './index';
import { paginationLT } from './pagination-function';

const refs = {
  listado: document.querySelector('.pagnumber'),
  botonAtras: document.getElementById('atras'),
  botonSiguiente: document.getElementById('siguiente'),
  pageOne: document.getElementById('primera'),
  pageFinal: document.getElementById('ultima'),
};

const gallery = document.querySelector('.gallery');
// const loader = document.querySelector('.dot-spinner');
const submit = document.querySelector('.btn');

let dataObject;
let totalResults;
let currentPage = 1;
let currentPage2 = 1;
let totalPag2 = 15;
let totalItems = 1000;

async function firstPagination() {
  const data = await getTrending(2);
  totalPag2 = data.total_pages;
  totalItems = data.total_results;
  const paginationResult = paginationLT(totalItems, 1);
  renderPagination(paginationResult);
}

firstPagination();

// Función para renderizar los números de página en la interfaz
function renderPagination(paginationArray) {
  refs.listado.innerHTML = ''; // Limpiar contenido anterior
  paginationArray.forEach(item => {
    const link = document.createElement('button');
    if (item === '...') {
      link.textContent = '...';
    } else {
      link.textContent = item;
      link.addEventListener('click', () => {
        currentPage = item; // Actualizar la página actual al hacer clic en un número de página
        //console.log('Página actual:', currentPage);
        // Lógica para actualizar el contenido de acuerdo a la nueva página (ejemplo: fetch de datos)
        // Luego, volver a renderizar la paginación

        if (selectedBySearch == 0) {
          const getTrendingMovies = async () => {
            const data = await getTrending(currentPage);
            if (data == undefined) return;
            const { results: movies, total_pages } = data;
            //console.log(data)

            renderMovies(movies);

            enableModal(false);

            gallery.addEventListener('click', e => {
              let movieId = e.target.id;

              //tenemos el id de la imagen seleccionada
              if (movieId != '') {
                fetchMovieById(movieId);
              }
            });
          };

          getTrendingMovies();
        } else {
          totalResults = localStorage.getItem('total-results-from-search'); //toma de la memoria del navegador
          dataObject = JSON.parse(totalResults); //convierto el string en objeto
          renderPagination(paginationLT(dataObject, currentPage2));

          async function renderPage() {
            string.trim();
            //console.log(string);
            const data = await fetchBySearch(string, currentPage);
            const { results: movies, total_pages } = data;
            renderMovies(movies);
            enableModal(true);
            gallery.addEventListener('click', e => {
              let movieId = e.target.id;
              //tenemos el id de la imagen seleccionada
              if (movieId != '') {
                fetchMovieById(movieId);
              }
            });
          }
          renderPage();
        }

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

        const paginationResult = paginationLT(totalItems, currentPage);
        renderPagination(paginationResult);
      });
    }
    refs.listado.appendChild(link);

    //console.log(link);
  });
}

renderPagination(paginationLT(totalItems, currentPage2));

// Asignar eventos a los botones de "Atrás" y "Siguiente"
refs.botonAtras.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const paginationResult = paginationLT(totalItems, currentPage);
    renderPagination(paginationResult);
    //console.log(paginationResult)
  }
});

refs.botonSiguiente.addEventListener('click', () => {
  if (currentPage < totalPag2) {
    currentPage++;
    const paginationResult = paginationLT(totalItems, currentPage);
    renderPagination(paginationResult);
    //console.log(paginationResult)
  }
});

/* crear la funcion con total_results */

submit.addEventListener('click', async e => {
  e.preventDefault();
  const data = await fetchBySearch(string, 1);
  totalPag2 = data.total_pages;
  totalItems = data.total_results;
  const paginationResult = paginationLT(totalItems, 1);
  renderPagination(paginationResult);
});
