import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { SHORTMOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, onDeleteCardClick, onLikeCardClick }) {
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isShort, setIsShort] = React.useState(false);
  const [isErrorSearch, setIsErrorSearch] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  React.useEffect(() => {
    let filteredFilms = JSON.parse(localStorage.getItem("savedMoviesStorage"));
    if (filteredFilms.length === 0) {
      filteredFilms = savedMovies;
    }
    if (filteredFilms) {
      setFilteredMoviesList(filteredFilms);
      sessionStorage.removeItem("titleSaved");
      setIsEmptyResult(false);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    const title = sessionStorage.getItem("titleSaved");
    findMoviesInLocalStorage(title);
  }, [isShort]);

  React.useEffect(() => {
    setIsPreloader(false);
  }, [isPreloader])

  function handleDeleteFromSaved(movie) {
    onDeleteCardClick(movie);
    const updateList = filteredMoviesList.filter((m) => {
      return m._id !== movie._id
    });
    setFilteredMoviesList(updateList);
    localStorage.setItem("savedMoviesStorage", JSON.stringify(updateList));
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

  function handleSearchSubmit(title) {
    setIsEmptyResult(false);
    setIsErrorSearch(false);
    setFilteredMoviesList({});
    findMoviesInLocalStorage(title);
  }

  function findMoviesInLocalStorage(title) {
    let filteredFilms = JSON.parse(localStorage.getItem("savedMoviesStorage"));

    if (title !== null) {
      sessionStorage.setItem("titleSaved", title);
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(title.toLowerCase());
      });
    } 
    
    if (isShort) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration < SHORTMOVIE_DURATION;
      });
    }

    setFilteredMoviesList(filteredFilms);
    setIsPreloader(false);

    if (filteredFilms.length === 0) {
      setFilteredMoviesList({});
      setIsEmptyResult(true);
    } else {
      setIsEmptyResult(false);
    }
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
