import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>
        <div className="header__links">
          <a className="header__links-registration" href="/signup">
            Регистрация
          </a>
          <a className="header__links-login" href="/signin">
            Войти
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
