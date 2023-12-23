import { useState, useEffect } from "react";

import NoteList from "../components/NoteList";

import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data";

function HomePage({ username, isDataFetching }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveNotes();
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="notes-section">
      <div className="container">
        <h1>Hi {username}, Welcome to the HomePage</h1>
        {isDataFetching && <p>Loading...</p>}
        <NoteList notes={notes} />
      </div>
    </section>
  );
}

HomePage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default HomePage;
