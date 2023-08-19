import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__header">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>
        <h1 className="login__greeting">Рады видеть!</h1>
        <div className="login__inputs">
          <div className="login__inputs-container">
            <p className="login__inputs-title">E-mail</p>
            <input className="login__input" />
          </div>
          <div className="login__inputs-container">
            <p className="login__inputs-title">Пароль</p>
            <input className="login__input" type="password" />
          </div>
        </div>
        <span className="login__error">Что-то пошло не так...</span>
        <button type="submit" className="login__button">
          Войти
        </button>
        <p className="login__hint">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
