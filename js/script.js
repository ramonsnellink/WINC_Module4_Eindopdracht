//ul where the LI items will be rendered
const movieListEl = document.querySelector(".movielist");
const filmFiltersEl = document.getElementsByName("film-filter");

console.log(filmFiltersEl);

const addImdbLink = (imdbID) => `https://www.imdb.com/title/${imdbID}`;

// Generate li's, with an image and a link.
const addMoviesToDom = (movies) => {
  const movieList = movies.map((movie) => {
    // Make Elements for every movie: li > a > img
    const movieListItem = document.createElement("li");
    const movieListLink = document.createElement("a");
    const movieListImage = document.createElement("img");

    // Add classes
    movieListItem.classList.add("movie");
    movieListLink.classList.add("movie__link");
    movieListImage.classList.add("movie__img");

    movieListImage.src = movie.Poster;
    movieListLink.href = addImdbLink(movie.imdbID);

    movieListItem.appendChild(movieListLink).appendChild(movieListImage);
    return movieListItem;
  });

  // add each movie-item to the DOM.

  movieList.forEach((movie) => {
    movieListEl.appendChild(movie);
  });
};

addMoviesToDom(movies);

// Add an event listener to every radio button
// Run the filter check

const addEventListeners = () => {
  filmFiltersEl.forEach((filmFilter) => {
    filmFilter.addEventListener("change", (event) => {
      handleOnChangeEvent(event);
    });
  });
};

addEventListeners();

// Check which filter is selected, run the filterMovies func with this term
const handleOnChangeEvent = (event) => {
  const selectedFilter = event.target.value;

  switch (selectedFilter) {
    case "newest":
      filterLatestMovies();
      break;
    case "avengers":
      filterMovies("avengers");
      break;
    case "x-men":
      filterMovies("x-men");

      break;
    case "princess":
      filterMovies("princess");

      break;
    case "batman":
      filterMovies("batman");
      break;

    default:
      break;
  }
};

// Check if the movie name is in the title
const filterMovies = (wordInMovieTitle) => {
  const filteredMoviesList = movies.filter((movie) => {
    return movie.Title.toLowerCase().includes(wordInMovieTitle);
  });

  //clear the UL
  movieListEl.innerHTML = " ";
  addMoviesToDom(filteredMoviesList);
};

// Filter for the "Latest movies" filter.
const filterLatestMovies = () => {
  const filteredMoviesList = movies.filter((movie) => {
    const movieYear = parseInt(movie.Year);
    return movieYear >= 2014;
  });

  //clear the UL
  movieListEl.innerHTML = " ";
  addMoviesToDom(filteredMoviesList);
};
