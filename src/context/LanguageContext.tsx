import React, { useEffect, useState, createContext } from "react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";
import Polish from "../languages/pl.json";

type Context = [string, React.Dispatch<React.SetStateAction<string>>];

export const LanguageContext = createContext<Context>(null!);

interface Props {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [messages, setMessages] = useState(English);

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
        {children}
      </LanguageContext.Provider>
    </IntlProvider>
  );
};

export default LanguageProvider;
