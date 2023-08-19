import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__header">
        <div className="about-project__header-title">О проекте</div>
      </div>
      <div className="about-project__container">
        <div className="about-project__content">
          <div className="about-project__content_title">
            Дипломный проект включал 5 этапов
          </div>
          <div className="about-project__content_subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </div>
        </div>
        <div className="about-project__content">
          <div className="about-project__content_title">
            На выполнение диплома ушло 5 недель
          </div>
          <div className="about-project__content_subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </div>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__backend">
          <div className="about-project__backend-scale">1 неделя</div>
          <div className="about-project__timeline-title">Back-end</div>
        </div>
        <div className="about-project__frontend">
          <div className="about-project__frontend-scale">4 недели</div>
          <div className="about-project__timeline-title">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
