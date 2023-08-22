import "./MoviesCardList.css";
import { useState, useEffect } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

    const [movieList, setMovieList] = useState([]);
    return(
        <section className="movie-card-list">
            <ul className="movie-card-list__container">
                {/* {movieList.map(m => ( */}
                  <MoviesCard />
                  <MoviesCard />  
                  <MoviesCard />  
                  {/* <MoviesCard />  
                  <MoviesCard />   */}
                  {/* <MoviesCard />  
                  <MoviesCard />  
                  <MoviesCard /> */}
                  {/* <MoviesCard />
                  <MoviesCard />  
                  <MoviesCard />  
                  <MoviesCard />   */}
                  {/* <MoviesCard />
                  <MoviesCard />  
                  <MoviesCard />  
                  <MoviesCard />   */}
                {/* ))} */}
            </ul>
            <button type="submit" className="movie-card-list__button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;