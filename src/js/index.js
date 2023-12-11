import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
let page = 1;
let pageSearch = 1;

const moviesGenre = [

  {number: 28, genre: 'Action'},
  {number: 12 , genre:'Adventure'},
  {number: 16 , genre:'Animation'},
  {number: 35 , genre:'Comedy'},
  {number: 80 , genre:'Crime'},
  {number: 99, genre: 'Documentary'},
  {number: 18 , genre:'Drama'},
  {number: 10751 , genre:'Family'},
  {number: 14 , genre:'Fantasy'},
  {number: 36 , genre:'History'},
  {number: 27 , genre:'Horror'},
  {number: 10402, genre:'Music'},
  {number: 9648, genre:'Mystery'},
  {number: 10749, genre:'Romance'},
  {number: 878, genre:'Science Fiction'},
  {number: 10770, genre:'TV Movie'},
  {number: 53 , genre:'Thriller'},
  {number: 10752, genre:'War'},
  {number: 37 , genre:'Western'}
  
] 

function findGender(data) { 
  const genreArray = []
  data.forEach(elementData => {
    moviesGenre.forEach(elementGenre => {
      if (elementData == elementGenre.number) { 
        genreArray.push(' '+ elementGenre.genre)
      }
    });

  });
  return genreArray
}

const getTrendingMovies = async () => {
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  console.log(movies);
  console.log(total_pages);

  movies.forEach(movie => {
    let year = movie.release_date.substr(0, 4)
    let genreText = findGender(movie.genre_ids)
    let titleUppercase = movie.title.toUpperCase()
    gallery.innerHTML += `<div class="photo-card">
                              <img class="galleryimage data-modal-open" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="${movie.id}" alt="${movie.title}" loading="lazy" />
                              <div class="info">
                                <p class="info-item"> 
                                  <b>${titleUppercase}</b>
                                </p>
                                <p class="info-item orange-text">
                                  <b>${genreText} | ${year}</b>
                                </p>
                             </div>
                           </div>`
  
  });

  (() => {
    const refs = {
      openModalBtn: document.querySelectorAll(".data-modal-open"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
    
    refs.openModalBtn.forEach(element => {
      element.addEventListener("click", toggleModal);
      
    });
    refs.closeModalBtn.addEventListener("click", toggleModal);

    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
    
  })();
  
  gallery.addEventListener('click', (e) => { 
  let movieId = e.target.id
    //tenemos el id de la imagen seleccionada
    
    fetchMovieById(movieId); 
    
})




};

const searchMovies = async query => {
  const data = await fetchBySearch(query, pageSearch);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  //console.log(movies);
  //console.log(total_pages);
};

const fetchMovieById = async id => {
  const data = await fetchById(id);
  console.log(data);

  const movieTitle = document.querySelector('.modal-title')
  movieTitle.textContent = data.original_title.toUpperCase()
  const results = document.querySelector('.results')
  const review = document.querySelector('.abouttext')
  const imgModal = document.querySelector('.img-modal')

  let movieGen = []
  data.genres.forEach(element => {
    movieGen.push(' '+element.name)
  });
  results.innerHTML = `<li><span class="span">${data.vote_average}</span> / ${data.vote_count}</li>
                                    <li>${data.popularity}</li>
                                    <li>${data.original_title}</li>
                                    <li>${movieGen}</li>`
  
  review.textContent = data.overview
  imgModal.src = `https://image.tmdb.org/t/p/w200${data.poster_path}`

};

getTrendingMovies();
searchMovies('mario');


const gallery = document.querySelector('.gallery')

