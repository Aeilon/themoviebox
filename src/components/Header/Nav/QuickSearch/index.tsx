import { Link } from "react-router-dom";
import { FormattedMessage, IntlShape } from "react-intl";
import React, { useContext } from "react";
import { ResolutionContext } from "../../../../context/ResolutionContext";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

interface Movie {
  title: string;
  id: number;
  poster_path: string;
}

interface Props {
  movies: Movie[];
  query: string;
  setSelectedMovieID: React.Dispatch<
    React.SetStateAction<number | string | undefined>
  >;
  toggleQuickSearch: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
  intl: IntlShape;
  updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuickSearch: React.FC<Props> = ({
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
        onBlur={(e: any) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            document.body.style.overflow = "visible";
            toggleQuickSearch(false);
          }
        }}
        tabIndex={0}
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
                <StyledLink
                  onClick={() => {
                    document.body.style.overflow = "visible";
                    toggleQuickSearch(false);
                  }}
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
                </StyledLink>
              </div>
            );
          })}
        </div>
        <div className="results">
          {movies.length > 1 && query.length > 2 && (
            <StyledLink
              onClick={() => {
                document.body.style.overflow = "visible";
                toggleQuickSearch(false);
                setSelectedMovieID(null!);
              }}
              to={{
                pathname: `/search`,
                state: {
                  query,
                },
              }}
            >
              <>
                <h2>
                  <FormattedMessage id="Show More" defaultMessage="Show More" />
                </h2>
              </>
            </StyledLink>
          )}
          {query.length > 2 && movies.length === 0 && (
            <h2>
              <FormattedMessage id="No Results" defaultMessage="No Results" />
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
