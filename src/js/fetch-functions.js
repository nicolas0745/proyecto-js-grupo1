const axios = require('axios').default;
const urlTrending = 'https://api.themoviedb.org/3/trending/movie/day';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzlhNjJlYTE5ZmQzZmUwYjhhZGE5NTM4Nzc1ZTZmOSIsInN1YiI6IjY1NzBjOWUwYTc2YWM1MDEzOTA5NzllNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2xkJugkWffi98YAAJOAs6dLpuODWV6jhron_0UeVaJg';

// Function to select trendig movies of the day.

export async function getTrending(page) {
  try {
    const response = await axios.get(urlTrending, {
      params: {
        language: 'en-US',
        page,
      },
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.statusText == 'OK') throw new Error('Response Failed');
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
