import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
import Preloader from "../Preloader/Preloader";
import { MoviesApiConst } from "../../utils/MoviesApi";

function Movies({ savedMovies, onDeleteCardClick, onLikeCardClick }) {
  const [previousSearch, setPreviousSearch] = React.useState(
    sessionStorage.getItem("title")
  );
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isShort, setIsShort] = React.useState(checkIsShort);
  const [isErrorSearch, setIsErrorSearch] = React.useState(false);

  React.useEffect(() => {
    renderingMovies();
  }, []);

  React.useEffect(() => {
    const title = sessionStorage.getItem("title");
    findMoviesInLocalStorage(title);
  }, [isShort]);

  function renderingMovies() {
    const filteredMovies = JSON.parse(sessionStorage.getItem("filteredMovies"));

    if (filteredMovies) {
      setFilteredMoviesList(filteredMovies);
      setIsPreloader(false);
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

  function getMovies() {
    MoviesApiConst.getMovies()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => console.log(err));
  }

  function findMoviesInLocalStorage(title) {
    sessionStorage.removeItem("filteredMovies");
    setFilteredMoviesList({});

    let movies = JSON.parse(localStorage.getItem("movies"));

    if (!movies || movies.length === 0) {
      return;
    }

    console.log('savedMovies inside findMoviesInLocalStorage', savedMovies);
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
          return movie.duration <= 40;
        });
      }

      setFilteredMoviesList(filteredMovies);
      sessionStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setIsPreloader(false);

      if (filteredMovies.length === 0) {
        sessionStorage.removeItem("filteredMovies");
        setFilteredMoviesList({});
        setIsPreloader(true);
      }
    }
  }

  function handleSearchSubmit(title) {
    setIsErrorSearch(false);
    setFilteredMoviesList({});
    sessionStorage.removeItem("filteredMovies");
    sessionStorage.setItem("title", title);

    try {
      let movies = JSON.parse(localStorage.getItem("movies"));

      if (!movies) {
        getMovies();
        let movies = JSON.parse(localStorage.getItem("movies"));

        if (!movies) {
          return;
        }

        movies = movies.filter((movie) => {
          return (
            movie.nameRU.toUpperCase().includes(title.toUpperCase()) ||
            movie.nameEN.toUpperCase().includes(title.toUpperCase())
          );
        });

        console.log('savedMovies inside handleSearchSubmit', savedMovies);
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
            return movie.duration <= 40;
          });
        }

        if (Object.keys(movies).length === 0) {
          sessionStorage.removeItem("filteredMovies");
        }

        sessionStorage.setItem("filteredMovie", JSON.stringify(movies));
        setFilteredMoviesList(movies);
        setIsPreloader(false);
      } else {
        setFilteredMoviesList({});
        findMoviesInLocalStorage(title);
      }
    } catch (e) {
      setIsErrorSearch(true);
      setIsPreloader(false);
      console.log(e);
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
