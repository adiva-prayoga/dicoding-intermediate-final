import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";

const LocalContext = createContext();

export const useLocale = () => {
  const localContext = useContext(LocalContext);
  if (!localContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return localContext;
};

export const LocaleProvider = ({ children }) => {
  const storedLocale = localStorage.getItem("locale");
  const [language, setLanguage] = useState(storedLocale || "en");

  const toggleLocale = () => {
    const newLanguage = language === "en" ? "id" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("locale", newLanguage);
  };

  return (
    <LocalContext.Provider value={{ language, toggleLocale }}>
      {children}
    </LocalContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
