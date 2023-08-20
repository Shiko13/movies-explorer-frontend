import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </div>
      <div className="footer__links">
        <p className="footer__year">&#169; 2023</p>
        <div className="footer__hrefs">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/Shiko13"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
