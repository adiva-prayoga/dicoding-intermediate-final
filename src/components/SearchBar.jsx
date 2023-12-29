import { useState } from "react";

import Icon from "../components/Icon";

import PropTypes from "prop-types";

function SearchBar({ activeKeyword, handleSearch }) {
  const [keyword, setKeyword] = useState(activeKeyword || "");

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setKeyword(value);

    handleSearch(value);
  };

  return (
    <section className="search-section">
      <Icon name="Search" color="white" size={18} strokeWidth={2} />
      <input
        type="text"
        placeholder="Search notes..."
        value={keyword}
        onChange={handleSearchChange}
      />
    </section>
  );
}

SearchBar.propTypes = {
  activeKeyword: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
