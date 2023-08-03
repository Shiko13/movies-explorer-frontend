import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__header">
        <div className="techs__header-title">Технологии</div>
      </div>
      <div className="techs__content">
        <div className="techs__content_title">7 технологий</div>
        <div className="techs__content_subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </div>
      </div>
      <ul className="techs__stack">
        <li className="techs__stack-content">
          <p className="techs__stack-name">HTML</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">CSS</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">JS</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">React</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">Git</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">Express.js</p>
        </li>
        <li className="techs__stack-content">
          <p className="techs__stack-name">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
