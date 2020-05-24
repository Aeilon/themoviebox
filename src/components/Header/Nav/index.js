import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useQuickSearch from "../../../hooks/useQuickSearch";
import { SelectedMovieContext } from "../../../context/SelectedMovieContext";
import { ResolutionContext } from "../../../context/ResolutionContext";
import { ViewContext } from "../../../context/ViewContext";
import { LanguageContext } from "../../../context/LanguageContext";
import TabBar from "../../TabBar";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import Poland from "../../../images/poland.png";
import USA from "../../../images/usa.png";

const Nav = () => {
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [autoComplete, setAutoComplete] = useState(false);
  const [menu, toggleMenu] = useState(false);
  const inputRef = useRef(null);
  const { movies } = useQuickSearch(query);
  const [isMobile] = useContext(ResolutionContext);
  // eslint-disable-next-line
  const [displayType, setDisplayType] = useContext(ViewContext);
  const [language, setLanguage] = useContext(LanguageContext);
  const updateQuery = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    setAutoComplete(false);
    // eslint-disable-next-line
  }, [window.location.href]);
  useEffect(() => {
    if (autoComplete) {
      inputRef.current.focus();
    }
  }, [autoComplete]);
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
          <>
            <img
              onClick={() => {
                document.body.style.overflow = "hidden";
                setAutoComplete(true);
              }}
              alt="search"
              src="https://img.icons8.com/dusk/64/000000/search.png"
            />
            <img
              alt="menu"
              onClick={() => {
                toggleMenu(!menu);
                document.body.style.overflow = "hidden";
              }}
              src="https://img.icons8.com/dusk/64/000000/menu-squared-2.png"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder={intl.formatMessage({
                id: "Search",
                defaultMessage: "Search...",
              })}
              onClick={() => {
                document.body.style.overflow = "hidden";
                setAutoComplete(true);
              }}
            />
            <img
              src={USA}
              alt="USA"
              onClick={() => setLanguage("en")}
              style={language === "en" ? { filter: "grayscale(0)" } : null}
            />
            <img
              src={Poland}
              alt="Poland"
              onClick={() => setLanguage("pl")}
              style={language === "pl" ? { filter: "grayscale(0)" } : null}
            />
          </>
        )}
      </div>
      {menu && (
        <div className="mobile-menu">
          <img
            className="x"
            onClick={() => {
              document.body.style.overflow = "visible";
              setAutoComplete(false);
              toggleMenu(false);
            }}
            alt="x"
            src="https://img.icons8.com/dusk/64/000000/cancel.png"
          />
          <div className="languages">
            <img
              src={USA}
              alt="USA"
              onClick={() => setLanguage("en")}
              style={language === "en" ? { filter: "grayscale(0)" } : null}
            />
            <img
              src={Poland}
              alt="Poland"
              onClick={() => setLanguage("pl")}
              style={language === "pl" ? { filter: "grayscale(0)" } : null}
            />
          </div>
          <TabBar />
        </div>
      )}
      {autoComplete && (
        <div className="blur">
          <div
            className="quick-search"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                document.body.style.overflow = "visible";
                setAutoComplete(false);
              }
            }}
            tabIndex="0"
          >
            {isMobile ? (
              <img
                className="x"
                onClick={() => {
                  document.body.style.overflow = "visible";
                  setAutoComplete(false);
                  toggleMenu(false);
                }}
                alt="x"
                src="https://img.icons8.com/dusk/64/000000/cancel.png"
              />
            ) : null}

            <div className="quick-search-input">
              <input
                type="text"
                value={query}
                placeholder={intl.formatMessage({ id: "Search" })}
                onChange={updateQuery}
                ref={inputRef}
              />
            </div>
            <div className="quick-search-grid">
              {movies.map((movie) => {
                const { title, id, poster_path } = movie;
                return (
                  <div className="quick-search-movie" key={id}>
                    <Link
                      onClick={() => {
                        document.body.style.overflow = "visible";
                        setAutoComplete(false);
                      }}
                      style={{ color: "white", textDecoration: "none" }}
                      key={id}
                      to={{
                        pathname: `/movie/${id}`,
                        state: {
                          id,
                        },
                      }}
                    >
                      <img
                        src={
                          !poster_path
                            ? "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                            : `https://image.tmdb.org/t/p/w500${poster_path}`
                        }
                        alt={title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
            {movies.length > 1 && query.length > 2 && (
              <Link
                onClick={() => {
                  document.body.style.overflow = "visible";
                  setAutoComplete(false);
                  setSelectedMovieID(null);
                }}
                style={{ color: "white", textDecoration: "none" }}
                to={{
                  pathname: `/search`,
                  state: {
                    query,
                  },
                }}
              >
                <>
                  <hr />
                  <h2>
                    <FormattedMessage
                      id="Show More"
                      defaultMessage="Show More"
                    />
                  </h2>
                </>
              </Link>
            )}
            {query.length > 2 && movies.length === 0 && (
              <h2>
                <FormattedMessage id="No Results" defaultMessage="No Results" />
              </h2>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Nav;
