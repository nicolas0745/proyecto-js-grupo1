import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import { renderMovies } from './functions';
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.dot-spinner');
let page = 1;
let pageSearch = 1;

// const moviesGenre = [
//   { number: 28, genre: 'Action' },
//   { number: 12, genre: 'Adventure' },
//   { number: 16, genre: 'Animation' },
//   { number: 35, genre: 'Comedy' },
//   { number: 80, genre: 'Crime' },
//   { number: 99, genre: 'Documentary' },
//   { number: 18, genre: 'Drama' },
//   { number: 10751, genre: 'Family' },
//   { number: 14, genre: 'Fantasy' },
//   { number: 36, genre: 'History' },
//   { number: 27, genre: 'Horror' },
//   { number: 10402, genre: 'Music' },
//   { number: 9648, genre: 'Mystery' },
//   { number: 10749, genre: 'Romance' },
//   { number: 878, genre: 'Science Fiction' },
//   { number: 10770, genre: 'TV Movie' },
//   { number: 53, genre: 'Thriller' },
//   { number: 10752, genre: 'War' },
//   { number: 37, genre: 'Western' },
// ];

// function findGender(data) {
//   const genreArray = [];
//   data.forEach(elementData => {
//     moviesGenre.forEach(elementGenre => {
//       if (elementData == elementGenre.number) {
//         genreArray.push(' ' + elementGenre.genre);
//       }
//     });
//   });
//   return genreArray;
// }

const getTrendingMovies = async () => {
  loader.classList.toggle('hidden');
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  // console.log(movies);
  // console.log(total_pages);
  renderMovies(movies);
  loader.classList.toggle('hidden');

  // movies.forEach(movie => {
  //   let year = movie.release_date.substr(0, 4);
  //   let genreText = findGender(movie.genre_ids);
  //   let titleUppercase = movie.title.toUpperCase();
  //   gallery.innerHTML += `<div class="photo-card">
  //                             <img class="galleryimage" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movies[0].title}" loading="lazy" />
  //                             <div class="info">
  //                               <p class="info-item">
  //                                 <b>${titleUppercase}</b>
  //                               </p>
  //                               <p class="info-item orange-text">
  //                                 <b>${genreText} | ${year}</b>
  //                               </p>
  //                            </div>
  //                          </div>`;
  // });
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
  console.log(total_pages);
  loader.classList.toggle('hidden');
});

// const searchMovies = async query => {
//   const data = await fetchBySearch(query, pageSearch);
//   if (data == undefined) return;
//   const { results: movies, total_pages } = data;
//   //console.log(movies);
//   //console.log(total_pages);
// };

const fetchMovieById = async id => {
  const data = await fetchById(id);
  //console.log(data);
};

getTrendingMovies();
// searchMovies('mario');
// console.log(fetchMovieById(1209403));

// const gallery = document.querySelector('.gallery');

/* function markUP(searchData) { 
  searchData.forEach(element => {
    gallery.innerHTML += `<div class="photo-card">
                            <a class="galleryitem" href=""> <img class="galleryimage" src="${}" alt="${}" loading="lazy" /></a>
                            <div class="info">
                              <p class="info-item"> 
                                <p><b>GREYHOUND</b></p>
                              </p>
                              <p class="info-item">
                                <p><b>Drama, Action | 2020</b></p>
                              </p>
                           </div>
                         </div>`
  }) ; 
 
} */
