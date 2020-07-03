import React, { useState, useRef, useContext, useEffect } from "react";
import useQuickSearch from "../../../hooks/useQuickSearch";
import { SelectedMovieContext } from "../../../context/SelectedMovieContext";
import { ResolutionContext } from "../../../context/ResolutionContext";
import { ViewContext } from "../../../context/ViewContext";
import { LanguageContext } from "../../../context/LanguageContext";
import { useIntl } from "react-intl";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import QuickSearch from "./QuickSearch";

const Nav: React.FC = () => {
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [quickSearch, toggleQuickSearch] = useState(false);
  const [menu, toggleMenu] = useState(false);
  const inputRef = useRef(null);
  const { movies } = useQuickSearch(query);
  const [isMobile] = useContext(ResolutionContext);
  // eslint-disable-next-line
  const [displayType, setDisplayType] = useContext(ViewContext);
  const [language, setLanguage] = useContext(LanguageContext);

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    toggleQuickSearch(false);
    // eslint-disable-next-line
  }, [window.location.href]);

  useEffect(() => {
    if (quickSearch) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [quickSearch]);
  if (isMobile) setDisplayType("grid");

  return (
    <nav>
      <div className="logo">
        <span onClick={() => (window.location.href = "/")}>
          THEMOVIE<b>BOX</b>
        </span>
      </div>
      <div className="menu">
        {isMobile ? (
          <MobileNav
            menu={menu}
            toggleMenu={toggleMenu}
            toggleQuickSearch={toggleQuickSearch}
          />
        ) : (
          <DesktopNav
            intl={intl}
            language={language}
            setLanguage={setLanguage}
            toggleQuickSearch={toggleQuickSearch}
          />
        )}
      </div>
      {menu && (
        <MobileMenu
          toggleMenu={toggleMenu}
          language={language}
          setLanguage={setLanguage}
          toggleQuickSearch={toggleQuickSearch}
        />
      )}
      {quickSearch && (
        <QuickSearch
          intl={intl}
          query={query}
          updateQuery={updateQuery}
          toggleQuickSearch={toggleQuickSearch}
          toggleMenu={toggleMenu}
          inputRef={inputRef}
          movies={movies}
          setSelectedMovieID={setSelectedMovieID}
        />
      )}
    </nav>
  );
};
export default Nav;
