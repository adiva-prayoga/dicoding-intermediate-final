import { useState, useEffect } from "react";

import NotFoundPage from "./NotFoundPage";

import { useParams, useNavigate } from "react-router-dom";

import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils/index";

function DetailPage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await getNote(id);
      setIsLoading(false);
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      navigate("/");
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleUnarchiveNote = async (id) => {
    try {
      await unarchiveNote(id);
      navigate("/archives");
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      navigate("/");
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchData(noteId);
  }, []);

  return !note ? (
    <NotFoundPage />
  ) : (
    <section className="detail-page-section">
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <div className="container">
          <h1 className="title">{note.title}</h1>
          <p className="date">{showFormattedDate(note.createdAt)}</p>
          <p className="body">{note.body}</p>

          {note.archived ? (
            <button
              className="archive-button"
              onClick={() => handleUnarchiveNote(noteId)}
            >
              Unarchive
            </button>
          ) : (
            <button
              className="archive-button"
              onClick={() => handleArchiveNote(noteId)}
            >
              Archive
            </button>
          )}

          <button
            className="delete-button"
            onClick={() => handleDeleteNote(noteId)}
          >
            Hapus
          </button>
        </div>
      )}
    </section>
  );
}

export default DetailPage;