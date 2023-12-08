import { getTrending, fetchBySearch, fetchById } from './fetch-functions';
let page = 1;
let pageSearch = 1;

const getTrendingMovies = async () => {
  const data = await getTrending(page);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  console.log(movies);
  console.log(total_pages);
};

const searchMovies = async query => {
  const data = await fetchBySearch(query, pageSearch);
  if (data == undefined) return;
  const { results: movies, total_pages } = data;
  console.log(movies);
  console.log(total_pages);
};

const fetchMovieById = async id => {
  const data = await fetchById(id);
  console.log(data);
};

getTrendingMovies();
searchMovies('mario');
fetchMovieById(1209403);
