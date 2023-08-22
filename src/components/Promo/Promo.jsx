import "./Promo.css";
import logo from "../../images/world_web.svg";
import NavTab from "../NavTab/NavTab";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <h2 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
        </div>
        <img className="promo__logo" src={logo} alt="Логотип с Землёй, состоящей из слов «Web»"></img>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;
