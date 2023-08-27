import "./NotFound.css";
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate(-1);
    }

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
            <button className="not-found__navigation" onClick={handleClick}>
                Назад
            </button>        
        </section>
    );
}

export default NotFound;