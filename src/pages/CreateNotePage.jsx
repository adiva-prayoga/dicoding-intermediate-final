import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { addNote } from "../utils/network-data";

function CreateNotePage() {
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
        <h1 className="title">Create New Note</h1>
        <form onSubmit={handleSubmit}>
          <p>Remaining characters: {note.maxTitleLength - note.title.length}</p>
          <input
            type="text"
            name="title"
            placeholder="Ini adalah judul..."
            value={note.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="body"
            placeholder="Tulis catatanmu di sini..."
            value={note.body}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default CreateNotePage;
