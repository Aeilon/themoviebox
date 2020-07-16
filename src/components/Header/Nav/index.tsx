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
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
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
      inputRef.current.focus();
    }
  }, [quickSearch]);

  useEffect(() => {
    if (isMobile) setDisplayType("grid");
  }, [isMobile]);

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
          language={language}
          setLanguage={setLanguage}
          isMobile={isMobile}
          toggleMenu={toggleMenu}
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
