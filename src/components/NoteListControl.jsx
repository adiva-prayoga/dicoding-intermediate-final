import Icon from "../components/Icon";

import { useLocale } from "../contexts/LocaleContext";

import PropTypes from "prop-types";

function NoteListControl({ activeItem, handleItemClick, searchResult }) {
  const { language } = useLocale();
  return (
    <section className="note-list-control">
      <div className="count">
        Total: {searchResult.length} {language === "en" ? "Notes" : "Catatan"}
      </div>
      <div className="layout-control">
        <div
          className={`item ${activeItem === 0 ? "active" : ""}`}
          onClick={() => handleItemClick(0)}
        >
          <Icon name="List" color="white" size={24} strokeWidth={2} />
        </div>
        <div
          className={`item ${activeItem === 1 ? "active" : ""}`}
          onClick={() => handleItemClick(1)}
        >
          <Icon name="LayoutGrid" color="white" size={24} strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}

NoteListControl.propTypes = {
  activeItem: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
};

export default NoteListControl;
