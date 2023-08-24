import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React from "react";

function SearchForm({ previousSearch, onSubmit, setIsPreloader, saveOfCheckingIsShort, isShort, isErrorSearch }) {
  const [input, setInput] = React.useState("");
  const [search, setSearch] = React.useState(previousSearch);
  const [isEmptySearch, setIsEmptySearch] = React.useState(false);

  React.useEffect(() => {
    input === "" ? setIsEmptySearch(true) : setIsEmptySearch(false);
  }, [input]);

  React.useEffect(() => {
    setIsEmptySearch(false);
    setInput(search);
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) {
        return;
    }

    if (input !== '') {
        setIsPreloader(true);
        onSubmit(input);
    } 
  }

  return (
    <>
      <section className="search-form">
        <form className="search-form__container">
          <input
            className="search-form__input"
            placeholder="Фильм"
            required
            onChange={handleChange}
            value={input || search || ''}
          />
          {isEmptySearch && (
            <span className="search-form__error">Нужно ввести ключевое слово</span>
          )}
          <button className="search-form__button" type="submit" onClick={handleSubmit}></button>
          {isErrorSearch && (
            <span className="search-form__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>
          )}
        </form>
      </section>
      <FilterCheckbox saveOfCheckingIsShort={saveOfCheckingIsShort} isShort={isShort}/>
    </>
  );
}

export default SearchForm;
