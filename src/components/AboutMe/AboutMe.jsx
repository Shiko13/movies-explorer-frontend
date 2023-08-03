import "./AboutMe.css";
import photo from "../../images/photo.png";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__header">
        <div className="about-me__header-title">Студент</div>
      </div>
      <div className="about-me__container">
        <div className="about-me__content">
          <h1 className="about-me__content-name">Виталий</h1>
          <h2 className="about-me__content-info">
            Фронтенд-разработчик, 30 лет
          </h2>
          <h3 className="about-me__content-history">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </h3>
          <a
            className="about-me__content-link"
            href="https://github.com/Shiko13"
          >
            Github
          </a>
        </div>
        <div className="about-me__photo">
            <img src={photo} alt="Фотография студента" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
