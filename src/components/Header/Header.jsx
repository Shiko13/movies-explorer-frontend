import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn }) {
    return (
        <section className="header">
            <div className="header__container">
                <img className="header__logo" src={logo} alt="Логотип с буквой «С»" />
                <Navigation />    
            </div>
        </section>
    );
}

export default Header;
