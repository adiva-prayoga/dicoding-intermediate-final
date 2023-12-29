import { useState, useEffect } from "react";

import NoteList from "../components/NoteList";
import NoteListControl from "../components/NoteListControl";
import SearchBar from "../components/SearchBar";
import Icon from "../components/Icon";

import { useLocale } from "../contexts/LocaleContext";

import { Link, useSearchParams } from "react-router-dom";

import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const { language } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKeyword = searchParams.get("search");

  const [notes, setNotes] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeItem, setActiveItem] = useState(1);
  const [isListLayout, setIsListLayout] = useState(false);

  const handleItemClick = (itemIndex) => {
    setActiveItem(itemIndex);

    if (itemIndex === 1) {
      setIsListLayout(false);
    } else {
      setIsListLayout(true);
    }
  };

  const changeSearchParams = (keyword) => {
    setSearchParams({ search: keyword });
  };

  const handleSearch = (searchResult) => {
    changeSearchParams(searchResult);
  };

  const filterNotes = (keyword) => {
    if (!keyword) {
      return notes;
    }

    const lowerCaseKeyword = keyword.toLowerCase();
    return notes.filter((note) =>
      note.title.toLowerCase().includes(lowerCaseKeyword)
    );
  };

  const fetchData = async () => {
    try {
      const response = await getActiveNotes();
      setIsLoading(false);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(() => filterNotes(activeKeyword, notes));
  }, [activeKeyword, notes]);

  return (
    <section className="notes-section">
      <div className="container">
        <h1 className="title">
          {language === "en" ? "Active Notes" : "Catatan Aktif"}
        </h1>
        <SearchBar handleSearch={handleSearch} activeKeyword={activeKeyword} />
        <NoteListControl
          handleItemClick={handleItemClick}
          activeItem={activeItem}
          searchResult={searchResult}
        />
        <NoteList
          notes={searchResult}
          isLoading={isLoading}
          isListLayout={isListLayout}
        />
        <Link to="/notes/new" className="add-note-button">
          <Icon name="PlusCircle" color="white" size={64} strokeWidth={1} />
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
