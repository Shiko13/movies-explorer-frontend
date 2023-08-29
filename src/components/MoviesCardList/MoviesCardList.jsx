import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import useResize from "use-resize";
import {INITIAL_NUMBER, COUNT_ADDING, SCREEN_POINTS } from "../../utils/constants";

function MoviesCardList({
  filteredMoviesList,
  savedMoviesList,
  onDeleteCardClick,
  onLikeCardClick,
}) {
  const [movieList, setMovieList] = useState([]);
  const [isShowButton, setIsShowButton] = useState(false);
  const [firstCard, setFirstCard] = React.useState(0);
  const size = useResize();

  React.useEffect(() => {
    handleShowButton();
  }, [movieList]);

  React.useEffect(() => {
    renderFirstMovies();
  }, [filteredMoviesList]);
  
  function renderAddMovies(e) {
    let count = 0;
    if (size.width > SCREEN_POINTS.big) {
      count = COUNT_ADDING.desktop;
    } else if (SCREEN_POINTS.medium <= size.width && size.width <= SCREEN_POINTS.big) {
      count = COUNT_ADDING.laptop;
    } else if (SCREEN_POINTS.small <= size.width && size.width <= SCREEN_POINTS.medium) {
      count = COUNT_ADDING.tablet;
    } else {
      count = COUNT_ADDING.mobile;
    }

    let addCards = Array.from(filteredMoviesList).splice(firstCard, count);
    setFirstCard(firstCard + count);
    setMovieList(movieList.concat(addCards));
  }

  function renderFirstMovies() {
    setMovieList([]);
    let startSplitPosition = 0;
    if (size.width > SCREEN_POINTS.big) {
      startSplitPosition = INITIAL_NUMBER.desktop;
    } else if (SCREEN_POINTS.medium <= size.width && size.width <= SCREEN_POINTS.big) {
      startSplitPosition = INITIAL_NUMBER.laptop;
    } else if (SCREEN_POINTS.small <= size.width && size.width <= SCREEN_POINTS.medium) {
      startSplitPosition = INITIAL_NUMBER.tablet;
    } else {
      startSplitPosition = INITIAL_NUMBER.mobile;
    }
    let movies = Array.from(filteredMoviesList).splice(0, startSplitPosition);
    movies = movies.filter(Boolean);
    setMovieList(movies);
    setFirstCard(startSplitPosition - 1);
  }

  function handleShowButton() {
    let step = 0;
    if (size.width > SCREEN_POINTS.big) {
      step = INITIAL_NUMBER.desktop;
    } else if (SCREEN_POINTS.medium < size.width && size.width < SCREEN_POINTS.big) {
      step = INITIAL_NUMBER.laptop;
    } else if (SCREEN_POINTS.small < size.width && size.width < SCREEN_POINTS.medium) {
      step = INITIAL_NUMBER.tablet;
    } else {
      step = INITIAL_NUMBER.mobile;
    }

    const isAnotherMoviesExist = firstCard >= filteredMoviesList.length;
    const isShowed = movieList.length >= step;
    setIsShowButton(isShowed && !isAnotherMoviesExist);
  }

  function checkIsSaved(movieList, movie) {
    return movieList.find((m) => {
      return m.movieId === (movie.id || movie.movieId);
    });
  }

  return (
    <section className="movie-card-list">
      {(filteredMoviesList !== null &&filteredMoviesList.length !== 0) && (
        <ul className="movie-card-list__container">
          {movieList.map((movie, index) => {
            return (
              <MoviesCard
                key={index}
                movie={movie}
                isSaved={checkIsSaved(savedMoviesList, movie)}
                onDeleteCardClick={onDeleteCardClick}
                onLikeCardClick={onLikeCardClick}
              />
            );
          })}
        </ul>
      )}
      {isShowButton && (
        <button
          type="submit"
          className="movie-card-list__button"
          onClick={renderAddMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
