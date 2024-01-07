import { useState, useEffect } from "react";

import NotFoundPage from "./NotFoundPage";
import Icon from "../components/Icon";

import { useLocale } from "../contexts/LocaleContext";

import { useParams, useNavigate } from "react-router-dom";

import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils/index";

function DetailPage() {
  const { language } = useLocale();
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
          <p className="date">
            {" "}
            {language === "en"
              ? showFormattedDate(note.createdAt, "en-US")
              : showFormattedDate(note.createdAt, "id-ID")}
          </p>
          <p className="body">{note.body}</p>

          <div className="detail-button">
            {note.archived ? (
              <div className="btn" onClick={() => handleUnarchiveNote(noteId)}>
                <Icon
                  name="ArchiveRestore"
                  color="white"
                  size={64}
                  strokeWidth={1}
                />
              </div>
            ) : (
              <div className="btn" onClick={() => handleArchiveNote(noteId)}>
                <Icon name="Archive" color="white" size={64} strokeWidth={1} />
              </div>
            )}

            <div className="btn" onClick={() => handleDeleteNote(noteId)}>
              <Icon name="Trash" color="white" size={64} strokeWidth={1} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailPage;
