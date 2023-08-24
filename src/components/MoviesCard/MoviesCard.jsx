import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import React from "react";

function MoviesCard({ movie, onDeleteCardClick, onLikeCardClick, isSaved }) {
  const [image, setImage] = React.useState("");
  const location = useLocation();

  function handleDeleteLike() {
    onDeleteCardClick(movie);
  }

  function handleLike() {
    onLikeCardClick(movie);
  }

  function fillImage() {
    if (movie.image.url) {
      setImage("https://api.nomoreparties.co" + movie.image.url);
    } else if (movie.image) {
      setImage(movie.image);
    }
  }

  React.useEffect(() => {
    fillImage();
  });

  return (
    <section className="movies-card">
      <div className="movies-card__container">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="movies-card__poster" src={image} alt={movie.nameRU} />
        </a>
        <div className="movies-card__info">
          <h1 className="movies-card__title">{movie.nameRU}</h1>
          {location.pathname === "/movies" && (
            <button
              className={`movies-card__button-like movies-card__button_type_${
                isSaved ? "saved" : "unsaved"
              }`}
              type="button"
              onClick={isSaved ? handleDeleteLike : handleLike}
            ></button>
          )}

          {location.pathname === "/saved-movies" && (
            <button
              className="movies-card__button-like movies-card__button_type_unliked"
              type="button"
              onClick={handleDeleteLike}
            ></button>
          )}
        </div>
        <h2 className="movies-card__duration">
          {movie.duration >= 60
            ? `${Math.floor(movie.duration / 60)}ч${movie.duration % 60}м`
            : `${movie.duration % 60}м`}
        </h2>
      </div>
    </section>
  );
}

export default MoviesCard;
