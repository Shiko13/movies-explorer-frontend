import "./Footer.css";

function Footer() {
    return(
        <section className="footer">
            <div className="footer__info">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </div>
            <div className="footer__links">
                <p className="footer__year">&#169; 2023</p>
                <a className="footer__link" href="www.https://practicum.yandex.ru/">Яндекс.Практикум</a>
                <a className="footer__link" href="https://github.com/Shiko13">Github</a>
            </div>
        </section>
    );
}

export default Footer;