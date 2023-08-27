import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useValidation from "../../hooks/useValidation";

function Login({ authorizate }) {
  const { isValid, values, handleChange, errors } =
    useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    authorizate(values.email, values.password);
  }

  return (
    <section className="login">
      <form className="login__container" noValidate onSubmit={handleSubmit}>
        <Link to="/" className="login__header">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>
        <h1 className="login__greeting">Рады видеть!</h1>
        <div className="login__inputs">
          <div className="login__inputs-container">
            <p className="login__inputs-title">E-mail</p>
            <input
              className="login__input"
              required
              type="email"
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
              onChange={handleChange}
              value={values.email || ""}
              name="email"
            />
          </div>
          {!isValid && (
          <span className="login__error">{errors.email || ''}</span>
        )}
          <div className="login__inputs-container">
            <p className="login__inputs-title">Пароль</p>
            <input
              className="login__input"
              required
              type="password"
              onChange={handleChange}
              value={values.password || ""}
              name="password"
            />
          </div>
        </div>
        {!isValid && (
          <span className="login__error">{errors.password || ''}</span>
        )}
        <button type="submit" className={isValid ? "login__button__active" : "login__button"} disabled={!isValid}>
          Войти
        </button>
        <p className="login__hint">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
