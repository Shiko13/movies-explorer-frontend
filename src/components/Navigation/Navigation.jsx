import "./Navigation.css";

function Navigation({ isLoggedIn }) {
    return (
        <section className="navigation">
            <a className="navigation__registration" href="www.ya.ru">
                Регистрация
            </a>
            <a className="navigation__enter" href="www.ya.ru">
                Войти
            </a>
        </section>
    )
}

export default Navigation;