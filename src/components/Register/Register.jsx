import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useValidation from "../../hooks/useValidation";
import { useEffect } from "react";

function Register({ register }) {
  const { isValid, values, clearForm, handleChange } =
    useValidation();

  useEffect(() => {
    clearForm();
  }, [clearForm]);

  function handleSubmit(e) {
    e.preventDefault();
    register(values.name, values.email, values.password);
  }

  return (
    <section className="register">
      <form className="register__container" onSubmit={handleSubmit} noValidate>
        <Link to="/" className="register__header">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <div className="register__inputs">
          <div className="register__inputs-container">
            <p className="register__inputs-title">Имя</p>
            <input
              className="register__input"
              required
              type="text"
              pattern="[а-яА-ЯёЁa-zA-Z\-\s]+"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={values.name || ""}
              name="name"
            />
          </div>
          <div className="register__inputs-container">
            <p className="register__inputs-title">E-mail</p>
            <input
              className="register__input"
              required
              type="email"
              pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
              onChange={handleChange}
              value={values.email || ""}
              name="email"
            />
          </div>
          <div className="register__inputs-container">
            <p className="register__inputs-title">Пароль</p>
            <input
              className="register__input"
              required
              type="password"
              onChange={handleChange}
              value={values.password || ""}
              name="password"
            />
          </div>
        </div>
        {!isValid && (
          <span className="register__error">Что-то пошло не так...</span>
        )}
        <button type="submit" className={isValid ? "register__button__active" : "register__button"} disabled={!isValid}>
          Зарегистрироваться
        </button>
        <p className="register__hint">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
