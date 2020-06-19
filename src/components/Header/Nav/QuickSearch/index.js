import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import React, { useContext } from "react";
import { ResolutionContext } from "../../../../context/ResolutionContext";

const QuickSearch = ({
  movies,
  query,
  setSelectedMovieID,
  toggleQuickSearch,
  toggleMenu,
  inputRef,
  intl,
  updateQuery,
}) => {
  const [isMobile] = useContext(ResolutionContext);
  return (
    <div className="blur">
      <div
        className="quick-search"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            document.body.style.overflow = "visible";
            toggleQuickSearch(false);
          }
        }}
        tabIndex="0"
      >
        {isMobile ? (
          <img
            className="x"
            onClick={() => {
              document.body.style.overflow = "visible";
              toggleQuickSearch(false);
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
            data-testid="quick-search-input"
            placeholder={intl.formatMessage({
              id: "Search",
              defaultMessage: "Search",
            })}
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
                    toggleQuickSearch(false);
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
              toggleQuickSearch(false);
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
                <FormattedMessage id="Show More" defaultMessage="Show More" />
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
  );
};

export default QuickSearch;
