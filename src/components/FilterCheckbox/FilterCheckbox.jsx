import "./FilterCheckbox.css";

function FilterCheckbox({ saveOfCheckingIsShort, isShort }) {
  return (
    <section className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          type="checkbox"
          onChange={saveOfCheckingIsShort}
          checked={isShort ? true : false}
        />
        <span className="filter-checkbox__slider"></span>
      </label>
      <h1 className="filter-checkbox__title">Короткометражки</h1>
    </section>
  );
}

export default FilterCheckbox;
