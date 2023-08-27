import "./Profile.css";
import useValidation from "../../hooks/useValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import React from "react";

function Profile({ handleLogOut, handleSubmit }) {
  const { isValid, setIsValid, values, setValues, handleChange } = 
    useValidation();
    const [successMessage, setSuccessMessage] = useState(false);

  const currentUser = React.useContext(CurrentUserContext);
  const isChangedOrValid = !isValid || (currentUser.name === values.name && currentUser.email === values.email)

  useEffect(() => {
    setIsValid(false);
    setValues({ email: currentUser.email, name: currentUser.name });
    setSuccessMessage(false);
  }, [currentUser, setIsValid, setValues]);

  useEffect(() => {
    (currentUser.name !== values.name || currentUser.email !== values.email) && isValid
      ? setIsValid(true)
      : setIsValid(false);
  }, [values])


  function handleUpdateUser(e) {
    e.preventDefault();
    console.log('currentUser.name', currentUser.name);
    console.log('values.name', values.name);
    console.log('currentUser.email', currentUser.email);
    console.log('values.email', values.email);
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      handleSubmit({ email: values.email, name: values.name });
      setSuccessMessage(true);
    } 
  }

  

  return (
    <section className="profile">
      <form className="profile__container" onSubmit={handleUpdateUser} noValidate>
        <h1 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h1>
        <div className="profile__data-name">
          <p className="profile__data-text">Имя</p>
          <input
            className="profile__data-text"
            value={values.name || ''}
            onChange={handleChange}
            name="name"
            type="text"
            minLength={2}
            maxLength={30}
            pattern="[а-яА-ЯёЁa-zA-Z\-\s]+"
          ></input>
        </div>
        <div className="profile__data-email">
          <p className="profile__data-text">E-mail</p>
          <input
            className="profile__data-text"
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            type="email"
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          ></input>
        </div>
        {successMessage && <span className="profile__message">Данные были успешно изменены</span>}
        <button className={isValid ? "profile__edit__active" : "profile__edit"} type="submit" disabled={!isValid}>           
        Редактировать
        </button>
        <button className="profile__logout" onClick={handleLogOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
