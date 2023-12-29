import { createContext, useContext, useState } from "react";

const LocalContext = createContext();

export const useLocale = () => useContext(LocalContext);

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
