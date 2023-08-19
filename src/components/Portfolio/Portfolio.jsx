import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__header">Портфолио</div>
      <ul className="portfolio__links">
        <li className="portfolio__content">
          <a
            className="portfolio__link"
            href="https://github.com/Shiko13/how-to-learn"
          >
            Статичный сайт
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__content">
          <a
            className="portfolio__link"
            href="https://github.com/Shiko13/russian-travel"
          >
            Адаптивный сайт
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__content">
          <a
            className="portfolio__link"
            href="https://github.com/Shiko13/react-mesto-api-full-gha"
          >
            Одностраничное приложение
            <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
