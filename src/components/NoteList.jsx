import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";

import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

function NoteList({ notes, isLoading, isListLayout }) {
  const { theme } = useTheme();
  const { language } = useLocale();

  const renderNotes = () => {
    if (isLoading) {
      return <div className="loading"></div>;
    }

    if (notes.length === 0) {
      return (
        <p className="empty-notes">
          {language === "en" ? "No Notes" : "Tidak ada catatan"}
        </p>
      );
    }

    return notes.map((note) => (
      <li
        key={note.id}
        className={`note-card ${isListLayout && "active"} ${
          theme === "light" ? "light" : "dark"
        }`}
      >
        <div className="wrap">
          <h1 className={`title ${theme === "light" ? "light" : "dark"}`}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </h1>
          <p className="date">
            {language === "en"
              ? showFormattedDate(note.createdAt, "en-US")
              : showFormattedDate(note.createdAt, "id-ID")}
          </p>
          <p className={`body ${isListLayout && "active"}`}>{note.body}</p>
        </div>
      </li>
    ));
  };

  return (
    <section className="note-list-section">
      <ul>{renderNotes()}</ul>
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isListLayout: PropTypes.bool.isRequired,
};

export default NoteList;
