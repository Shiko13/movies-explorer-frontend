import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
    return(
        <section className="portfolio">
            <div className="portfolio__header">
                Портфолио
            </div>
            <ul className="portfolio__links">
                <li className="portfolio__content">
                    <a className="portfolio__link" href="www.ya.ru">
                        Статичный сайт
                    </a>
                    <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
                </li>
                <li className="portfolio__content">
                    <a className="portfolio__link" href="www.ya.ru">
                        Адаптивный сайт
                    </a>
                    <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
                </li>
                <li className="portfolio__content">
                    <a className="portfolio__link" href="www.ya.ru">
                        Одностраничное приложение
                    </a>
                    <img src={arrow} alt="Стрелочка" className="portfolio__arrow" />
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;