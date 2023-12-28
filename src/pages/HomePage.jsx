import { useState, useEffect } from "react";

import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import Icon from "../components/Icon";

import { Link, useSearchParams } from "react-router-dom";

import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKeyword = searchParams.get("search");

  const [notes, setNotes] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeSearchParams = (keyword) => {
    console.log("Changing search params:", keyword);
    setSearchParams({ search: keyword });
  };

  const handleSearch = (searchResult) => {
    console.log("Handling search:", searchResult);
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
        <h1 className="title">Active Notes</h1>
        <SearchBar handleSearch={handleSearch} activeKeyword={activeKeyword} />
        <NoteList notes={searchResult} isLoading={isLoading} />
        <Link to="/notes/new">
          <button className="default-button">Create note</button>
          <Icon name="PlusCircle" color="white" size={64} strokeWidth={1} />
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
