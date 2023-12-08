import { getTrending } from './fetch-functions';
let page = 1;

const getMovies = async () => {
  const data = await getTrending(page);
  const { results: movies, total_pages } = data;
  console.log(movies);
  console.log(total_pages);
};

getMovies();
