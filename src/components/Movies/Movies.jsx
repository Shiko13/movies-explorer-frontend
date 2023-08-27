import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
import Preloader from "../Preloader/Preloader";
import { MoviesApiConst } from "../../utils/MoviesApi";
import { SHORTMOVIE_DURATION } from "../../utils/constants";

function Movies({ savedMovies, onDeleteCardClick, onLikeCardClick }) {
  const [previousSearch, setPreviousSearch] = React.useState(
    sessionStorage.getItem("title")
  );
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isShort, setIsShort] = React.useState(checkIsShort);
  const [isErrorSearch, setIsErrorSearch] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  React.useEffect(() => {
    renderingMovies();
  }, []);

  React.useEffect(() => {
    const title = sessionStorage.getItem("title");
    findMoviesInLocalStorage(title);
  }, [isShort]);

  React.useEffect(() => {
    setIsPreloader(false);
  }, [isPreloader])

  function renderingMovies() {
    const filteredMovies = JSON.parse(sessionStorage.getItem("filteredMovies"));

    if (filteredMovies) {
      setFilteredMoviesList(filteredMovies);
    }
  }

  function checkIsShort() {
    let isShort = localStorage.getItem("isShort");
    if (isShort === "false" || isShort === null) {
      return false;
    } else {
      localStorage.setItem("isShort", "true");
      return true;
    }
  }

  function saveOfCheckingIsShort() {
    if (isShort) {
      localStorage.removeItem("isShort");
      setIsShort(false);
    }

    if (!isShort) {
      localStorage.setItem("isShort", "true");
      setIsShort(true);
    }
  }

  async function getMovies() {
    await MoviesApiConst.getMovies()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => console.log(err));
  }

  function findMoviesInLocalStorage(title) {
    setIsPreloader(true);
    sessionStorage.removeItem("filteredMovies");
    setFilteredMoviesList({});

    let movies = JSON.parse(localStorage.getItem("movies"));

    if (!movies || movies.length === 0) {
      return;
    }

    movies = movies.map((movie) => {
      const savedMovie = [savedMovies].find((savedMovie) => {
        return savedMovie.movieId === movie.id;
      });

      if (savedMovie) {
        movie._id = savedMovie._id;
      }

      return movie;
    });

    if (title !== null) {
      let filteredMovies = movies.filter((movie) => {
        return (
          movie.nameRU.toUpperCase().includes(title.toUpperCase()) ||
          movie.nameEN.toUpperCase().includes(title.toUpperCase())
        );
      });

      if (isShort) {
        filteredMovies = filteredMovies.filter((movie) => {
          return movie.duration <= SHORTMOVIE_DURATION;
        });
      }

      setFilteredMoviesList(filteredMovies);
      sessionStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setIsEmptyResult(false);

      if (filteredMovies.length === 0) {
        sessionStorage.removeItem("filteredMovies");
        setFilteredMoviesList({});
        setIsEmptyResult(true);
      }
    }
  }

  async function handleSearchSubmit(title) {
    setIsEmptyResult(false);
    setIsErrorSearch(false);
    setFilteredMoviesList({});
    sessionStorage.removeItem("filteredMovies");
    sessionStorage.setItem("title", title);

    try {
      let movies = JSON.parse(localStorage.getItem("movies"));

      if (movies === null) {
        await getMovies();
        let movies = JSON.parse(localStorage.getItem("movies"));

        movies = movies.filter((movie) => {
          return (
            movie.nameRU.toUpperCase().includes(title.toUpperCase()) ||
            movie.nameEN.toUpperCase().includes(title.toUpperCase())
          );
        });

        movies = movies.map((movie) => {
          const savedMovie = [savedMovies].find((savedMovie) => {
            return savedMovie.movieId === movie.id;
          });

          if (savedMovie) {
            movie._id = savedMovie._id;
          }

          return movie;
        });

        if (isShort) {
          movies = movies.filter((movie) => {
            return movie.duration <= SHORTMOVIE_DURATION;
          });
        }

        if (Object.keys(movies).length === 0) {
          sessionStorage.removeItem("filteredMovies");
          setIsEmptyResult(true);
        }

        sessionStorage.setItem("filteredMovie", JSON.stringify(movies));
        setFilteredMoviesList(movies);
      } else {
        setFilteredMoviesList({});
        findMoviesInLocalStorage(title);
      }
    } catch (e) {
      setIsErrorSearch(true);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        previousSearch={previousSearch}
        onSubmit={handleSearchSubmit}
        isErrorSearch={isErrorSearch}
        setIsPreloader={setIsPreloader}
        saveOfCheckingIsShort={saveOfCheckingIsShort}
        isShort={isShort}
        isEmptyResult={isEmptyResult}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        filteredMoviesList={filteredMoviesList}
        savedMoviesList={savedMovies}
        onDeleteCardClick={onDeleteCardClick}
        onLikeCardClick={onLikeCardClick}
      />
    </section>
  );
}

export default Movies;
