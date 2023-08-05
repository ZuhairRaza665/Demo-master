export const errorArray = [];
export const fetchMovieData = async (item) => {
  let fullTitle;
  let nam = null;
  let year = null;
  let index = null;

  if (item) {
    fullTitle = item.title;

    index = fullTitle.indexOf(" - ");

    if (index == -1) {
      index = fullTitle.indexOf("(");
      nam = fullTitle.substring(0, index - 2);
      year = fullTitle.substring(index + 1, index + 5);
    } else {
      nam = fullTitle.substring(0, index);
      year = fullTitle.substring(index + 3, index + 7);
    }
  }

  if (nam != null) {
    const modifiedName = nam.replace(/ /g, "%20");

    const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?query=${modifiedName}&%20US&primary_release_year=${year}&page=1&api_key=d159eaf1a8e9ef27976592ad48ed5a2a`;
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      const movieData = data.results[0];
      const movieId = movieData.id || null;

      if (movieId) {
        item.id = movieId;
        await fetchMovieDetails(item, movieId);
      }
    } catch (error) {
      errorArray.push(item);
    }
  }
};

const fetchMovieDetails = async (item, movieID) => {
  const API_ENDPOINT = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=d159eaf1a8e9ef27976592ad48ed5a2a`;

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    item.backdrop_path = data.backdrop_path;
    item.genreNames = data.genres.map((genre) => genre.name);
    item.overview = data.overview;
    item.poster_path = data.poster_path;
    item.release_date = data.release_date;
    item.runtime = data.runtime;
  } catch (error) {
    errorArray.push(item);
  }
};
