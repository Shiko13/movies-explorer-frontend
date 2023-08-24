import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React from "react";

function SavedMovies({ savedMovies, onDeleteCardClick, onLikeCardClick }) {
  const [previousSearch, setPreviousSearch] = React.useState(
    sessionStorage.getItem("title")
  );
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isShort, setIsShort] = React.useState(checkIsShort);
  const [isErrorSearch, setIsErrorSearch] = React.useState(false);

  React.useEffect(() => {
    setFilteredMoviesList(savedMovies);
  }, [savedMovies]);

  React.useEffect(() => {
    const title = sessionStorage.getItem("title");
    findMoviesInLocalStorage(title);
  }, [isShort]);

  function handleDeleteLike(movie) {
    console.log(movie);
    onDeleteCardClick(movie);
    const updateList = filteredMoviesList.filter((m) => {
      console.log(m);
      return m._id !== movie._id
    });
    console.log('udpateList:', updateList);
    setFilteredMoviesList(updateList);
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

  function findMoviesInLocalStorage(title) {
    let filteredMovies = savedMovies.filter((movie) => {
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
    setIsPreloader(false);

    if (filteredMovies.length === 0) {
      setFilteredMoviesList({});
      setIsPreloader(true);
    }
  }

  function handleSearchSubmit(title) {
    setIsErrorSearch(false);
    setFilteredMoviesList({});
    findMoviesInLocalStorage(title);
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onSubmit={handleSearchSubmit}
        isErrorSearch={isErrorSearch}
        setIsPreloader={setIsPreloader}
        saveOfCheckingIsShort={saveOfCheckingIsShort}
        isShort={isShort}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        filteredMoviesList={filteredMoviesList}
        onDeleteCardClick={handleDeleteLike}
        onLikeCardClick={onLikeCardClick}
        savedMoviesList={savedMovies}
      />
    </section>
  );
}

export default SavedMovies;
