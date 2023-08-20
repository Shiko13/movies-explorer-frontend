import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return(
        <>
            <section className="search-form">
                <form className="search-form__container">
                    <input className="search-form__input" placeholder="Фильм" required/>
                    <button className="search-form__button" type="submit"></button>
                </form>      
            </section>
            <FilterCheckbox />
        </>   
    );
}

export default SearchForm;