const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDU3YzgxMzRhZjE3MWM3YTk3NjA3Mjk2MWUyOWY1MSIsInN1YiI6IjY1NzNhZGNmZDQwMGYzMDBjOTIwOTJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1IdNqN9HcQoVWvkk0GsmzK0OberDk5bdp3RCC_tmBE'
  }
};

fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=3', options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
  })

    .catch(err => console.error(err));
  

