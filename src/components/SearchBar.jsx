import { useState } from "react";

import Icon from "../components/Icon";
import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

import PropTypes from "prop-types";

function SearchBar({ activeKeyword, handleSearch }) {
  const { theme } = useTheme();
  const { language } = useLocale();
  const [keyword, setKeyword] = useState(activeKeyword);

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setKeyword(value);

    handleSearch(value);
  };

  return (
    <section className="search-section">
      <Icon
        name="Search"
        color={theme === "light" ? "#070e1d" : "#fff"}
        size={18}
        strokeWidth={2}
      />
      <input
        className={theme === "light" ? "light" : "dark"}
        type="text"
        placeholder={language === "en" ? "Search notes..." : "Cari catatan..."}
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
