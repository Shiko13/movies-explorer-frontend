import "./MoviesCard.css";
import image from "../../images/movie_template.png";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onDeleteCardClick, onLikeCardClick, isSaved }) {
  const location = useLocation();

  function handleDeleteCardClick() {
    onDeleteCardClick(movie);
  }

  function handleLikeCardClick() {
    onLikeCardClick(movie);
  }

  return (
    <section className="movies-card">
      <div className="movies-card__container">
        <a href="ya.ru">
          <img className="movies-card__poster" src={image} alt="Title" />
        </a>
        <div className="movies-card__info">
          <h1 className="movies-card__title">33 слова о дизайне</h1>
          <button
            className={
              location.pathname === "/saved-movies"
                ? "movies-card__button-like movies-card__button_type_unliked"
                : `movies-card__button-like movies-card__button_type_${
                    isSaved ? "saved" : "unsaved"
                  }`
            }
            type="submit"
          ></button>
        </div>
        <h2 className="movies-card__duration">1ч42м</h2>
      </div>
    </section>
  );
}

export default MoviesCard;
