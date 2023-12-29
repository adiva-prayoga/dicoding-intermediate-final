import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { addNote } from "../utils/network-data";

import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

function CreateNotePage() {
  const { theme } = useTheme();
  const { language } = useLocale();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    body: "",
    maxTitleLength: 40,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const { maxTitleLength } = note;

    if (name === "title" && value.length > maxTitleLength) {
      return;
    }

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, body } = note;

      if (title && body) {
        await addNote({ title, body });
      }

      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <section className="form-section">
      <div className="container">
        <h1 className="title">
          {language === "en" ? "Create Note" : "Buat Catatan"}
        </h1>
        <form onSubmit={handleSubmit}>
          <p>
            {language === "en" ? "Remaining characters:" : "Karakter tersisa:"}
            {note.maxTitleLength - note.title.length}
          </p>
          <input
            className={theme === "light" ? "light" : "dark"}
            type="text"
            name="title"
            placeholder={language === "en" ? "Title" : "Ini adalah judul..."}
            value={note.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            className={theme === "light" ? "light" : "dark"}
            name="body"
            placeholder={
              language === "en"
                ? "Write your note here"
                : "Tulis catatanmu di sini..."
            }
            value={note.body}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="submit-button">
            {language === "en" ? "Save" : "Simpan"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateNotePage;
