import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";

import { useTheme } from "../contexts/ThemeContext";

function NoteList({ notes, isLoading, isListLayout }) {
  const { theme } = useTheme();

  return (
    <section className="note-list-section">
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <ul>
          {notes.length === 0 ? (
            <p className="empty-notes">Tidak ada catatan</p>
          ) : (
            notes.map((note) => (
              <li
                key={note.id}
                className={`note-card ${isListLayout && "active"} ${
                  theme === "light" ? "light" : "dark"
                }`}
              >
                <div className="wrap">
                  <h1
                    className={`title ${theme === "light" ? "light" : "dark"}`}
                  >
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                  </h1>
                  <p className="date">{showFormattedDate(note.createdAt)}</p>
                  <p className={`body ${isListLayout && "active"}`}>
                    {note.body}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isListLayout: PropTypes.bool.isRequired,
};

export default NoteList;
