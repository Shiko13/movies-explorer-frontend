import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import React from "react";

function MoviesCardList({
  filteredMoviesList,
  savedMoviesList,
  onDeleteCardClick,
  onLikeCardClick,
}) {
  const [movieList, setMovieList] = useState([]);
  const [isShowButton, setIsShowButton] = useState(false);

  const LG_ROW_CARD_COUNT = 4;
  const MD_ROW_CARD_COUNT = 2;
  const SM_ROW_CARD_COUNT = 1;

  const LG_INITIAL_CARD_COUNT = 16;
  const MD_INITIAL_CARD_COUNT = 8;
  const SM_INITIAL_CARD_COUNT = 5;

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] =
    React.useState(initialCardCount);

  const handleClick = () => {
    calculateCardCount();
  };

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT + 1);
  };

  function checkIsSaved(movieList, movie) {
    return movieList.find((m) => {
        return m.movieId === (movie.id || movie.movieId)
    });
  }

  useEffect(() => {
    let movies = Array.from(filteredMoviesList).slice(
      0,
      roundedVisibleCardCount
    );
    setMovieList(movies);
    if (filteredMoviesList.length > roundedVisibleCardCount) {
      setIsShowButton(true);
    }
  }, [filteredMoviesList, initialCardCount, roundedVisibleCardCount]);

  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__container">
        {movieList.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            isSaved={checkIsSaved(savedMoviesList, movie)}
            onDeleteCardClick={onDeleteCardClick}
            onLikeCardClick={onLikeCardClick}
          />
        ))}
      </ul>
      {isShowButton && (
        <button
          type="submit"
          className="movie-card-list__button"
          onClick={handleClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
