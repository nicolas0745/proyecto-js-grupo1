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

// funcion para encontrar los generos de una oelicula

function findGender(data) {
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

// Funcion para renderizar las pelicuñas en gallery

export function renderMovies(movies) {
  let htmlcode = '';
  let imgSrcr = '';
  movies.forEach(movie => {
    console.log(movie);
    let year = movie.release_date.substr(0, 4);
    let genreText = findGender(movie.genre_ids);
    if (movie.poster_path == null)
      imgSrcr = `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg`;
    else imgSrcr = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    let titleUppercase = movie.title.toUpperCase();
    htmlcode += `<div class="photo-card">
                                  <img class="galleryimage data-modal-open" id="${movie.id}"src="${imgSrcr}" alt="${movies[0].title}" loading="lazy" />
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
  }

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
}
