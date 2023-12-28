import { useState, useEffect } from "react";

import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data";

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getArchivedNotes();
      setIsLoading(false);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="archive-notes-section">
      <div className="container">
        <h1 className="title">Archived Notes</h1>
        <SearchBar />
        <NoteList notes={notes} isLoading={isLoading} />
      </div>
    </section>
  );
}

ArchivedPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archivedAt: PropTypes.string.isRequired,
    })
  ),
};

export default ArchivedPage;
