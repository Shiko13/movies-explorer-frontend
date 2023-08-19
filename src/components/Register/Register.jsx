import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__header">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <div className="register__inputs">
          <div className="register__inputs-container">
            <p className="register__inputs-title">Имя</p>
            <input className="register__input" />
          </div>
          <div className="register__inputs-container">
            <p className="register__inputs-title">E-mail</p>
            <input className="register__input" />
          </div>
          <div className="register__inputs-container">
            <p className="register__inputs-title">Пароль</p>
            <input className="register__input" type="password" />
          </div>
        </div>
        <span className="register__error">Что-то пошло не так...</span>
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
        <p className="register__hint">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
