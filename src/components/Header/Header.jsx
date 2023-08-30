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
          <Link to="/signup" className="header__links-registration" >
            Регистрация
          </Link>
          <Link to="/signin" className="header__links-login" >
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
