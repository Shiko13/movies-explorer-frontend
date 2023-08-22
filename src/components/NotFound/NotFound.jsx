import "./NotFound.css";

function NotFound() {
    return(
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__code">
                    404
                </h1>
                <h2 className="not-found__text">
                    Страница не найдена
                </h2>
            </div>
            <a className="not-found__navigation" href="/">
                Назад
            </a>        
        </section>
    );
}

export default NotFound;