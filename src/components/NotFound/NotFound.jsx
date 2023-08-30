import "./NotFound.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

function NotFound({handleBack }) {
    const location = useLocation();
    const navigate = useNavigate();

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
            <button className="not-found__navigation" onClick={handleBack}>
                Назад
            </button>        
        </section>
    );
}

export default NotFound;