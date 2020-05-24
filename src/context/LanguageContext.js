import React, { useEffect, useState, createContext } from "react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";
import Polish from "../languages/pl.json";
export const LanguageContext = createContext();

const LanguageProvider = (props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [messages, setMessages] = useState();
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  useEffect(() => {
    if (language === "pl") return setMessages(Polish);
    return setMessages(English);
  }, [language]);

  return (
    <IntlProvider locale="en" messages={messages}>
      <LanguageContext.Provider value={[language, setLanguage]}>
        {props.children}
      </LanguageContext.Provider>
    </IntlProvider>
  );
};

export default LanguageProvider;
