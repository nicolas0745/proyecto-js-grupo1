import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
import { renderMovies, enableModal } from './functions';


localStorage.removeItem("total-results-from-search");
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('.btn');
const inputSearch = document.querySelector('.input');
const loader = document.querySelector('.dot-spinner');
export let selectedBySearch = 0;
export let string = '';

let totalPageSearch = 0
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

  gallery.addEventListener('click', e => {
    let movieId = e.target.id;
    
    //tenemos el id de la imagen seleccionada
    if (movieId != '') { 
    fetchMovieById(movieId);
    } 
      
  });

  
  
};

btnSubmit.addEventListener('click', async e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  string = inputSearch.value;
  
  string.trim();
  //console.log(string);
  const data = await fetchBySearch(string, pageSearch);
  if (data == undefined) return;
  const { results: movies, total_page } = data;
  console.log(data)
  totalPageSearch = data.total_results
  const pageString = JSON.stringify(totalPageSearch)//convierto en string
  localStorage.setItem('total-results-from-search', pageString)
  
  renderMovies(movies);
  enableModal(true);
  // console.log(total_pages);
  loader.classList.toggle('hidden');
  selectedBySearch = 1;
  console.log(selectedBySearch)
  gallery.addEventListener('click', e => {
    let movieId = e.target.id;
    //tenemos el id de la imagen seleccionada
    if (movieId != '') { 
    fetchMovieById(movieId);
    } 
    
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


