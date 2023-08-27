import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { SHORTMOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, onDeleteCardClick, onLikeCardClick }) {
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isShort, setIsShort] = React.useState(checkIsShort);
  const [isErrorSearch, setIsErrorSearch] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  React.useEffect(() => {
    renderingMovies();
  }, [savedMovies]);

  React.useEffect(() => {
    const title = sessionStorage.getItem("titleSaved");
    findMoviesInLocalStorage(title);
    setIsPreloader(false);
  }, [isShort, setIsShort]);

  React.useEffect(() => {
    setIsPreloader(false);
  }, [isPreloader])

  function renderingMovies() {
    let filteredMovies = JSON.parse(localStorage.getItem("savedMovies"));
    console.log('filter', filteredMovies);

    if (filteredMovies) {
      setFilteredMoviesList(filteredMovies);
      setIsEmptyResult(false);
    }
  }

  function handleDeleteFromSaved(movie) {
    const updateList = filteredMoviesList.filter((m) => {
      return m._id !== movie._id
    });
    setFilteredMoviesList(updateList);
    localStorage.setItem("savedMovies", JSON.stringify(updateList));
    onDeleteCardClick(movie);
  }

  function saveOfCheckingIsShort() {
    if (isShort) {
      localStorage.removeItem("isShortSaved");
      setIsShort(false);
    }

    if (!isShort) {
      localStorage.setItem("isShortSaved", "true");
      setIsShort(true);
    }
  }

  function checkIsShort() {
    let isShort = localStorage.getItem("isShortSaved");
    if (isShort === "false" || isShort === null) {
      return false;
    } else {
      localStorage.setItem("isShortSaved", "true");
      return true;
    }
  }

  function findMoviesInLocalStorage(title) {
    setIsPreloader(true);
    sessionStorage.setItem("titleSaved", title);

    let saved = JSON.parse(localStorage.getItem("savedMovies"));
    console.log('saved', saved);
    console.log('title', title);

    if (title !== null) {
      let filteredMovies = saved.filter((movie) => {
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
      setIsEmptyResult(false);
  
      if (filteredMovies.length === 0) {
        setFilteredMoviesList({});
        setIsEmptyResult(true);
      }
    } else {
      let anotherFilteredMovies;
      
      if (isShort) {
        anotherFilteredMovies = savedMovies.filter((movie) => {
          return movie.duration <= SHORTMOVIE_DURATION;
        });
      }
  
      setFilteredMoviesList(anotherFilteredMovies);
      setIsEmptyResult(false);
    }
  }

  function handleSearchSubmit(title) {
    setIsEmptyResult(false);
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
        isEmptyResult={isEmptyResult}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        filteredMoviesList={filteredMoviesList}
        onDeleteCardClick={handleDeleteFromSaved}
        onLikeCardClick={onLikeCardClick}
        savedMoviesList={savedMovies}
      />
    </section>
  );
}

export default SavedMovies;
