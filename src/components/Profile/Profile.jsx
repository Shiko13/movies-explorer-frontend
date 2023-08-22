import "./Profile.css";

function Profile({ handleLogOut }) {
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__greeting">Привет, Виталий!</h1>
        <div className="profile__data-name">
          <p className="profile__data-text">Имя</p>
          <p className="profile__data-text">Виталий</p>
        </div>
        <div className="profile__data-email">
          <p className="profile__data-text">E-mail</p>
          <p className="profile__data-text">pochta@yandex.ru</p>
        </div>
        <button className="profile__edit" type="submit">
          Редактировать
        </button>
        <button className="profile__logout" type="submit">
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
