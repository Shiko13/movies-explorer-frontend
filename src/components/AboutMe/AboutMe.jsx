import "./AboutMe.css";
import me from "../../images/me.png";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__header">
        <div className="about-me__header-title">Студент</div>
      </div>
      <div className="about-me__container">
        <div className="about-me__content">
          <h1 className="about-me__content-name">Сергей</h1>
          <h2 className="about-me__content-info">
            Фуллстек-разработчик, 33 года
          </h2>
          <h3 className="about-me__content-history">
            Окончил Санкт-Петербургский Политехнический университет с красным дипломом.
            Последние годы программирую на Java, также активно изучаю веб-разработку. 
            Сейчас работаю в Яндекс-Практикуме и в стартапе, где беру
            как задачи по бэкенду, так и по фронтенду. Ниже можно ознакомиться с некоторыми из моих 
            работ.
          </h3>
          <a
            className="about-me__content-link"
            href="https://github.com/Shiko13"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
          <img className="about-me__photo" src={me} alt="Моё фото" />
      </div>
    </section>
  );
}

export default AboutMe;
