import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import DisplayMovie from "../../components/DisplayMovie";
import useMovieSearch from "../../hooks/useMovieSearch";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import { ViewContext } from "../../context/ViewContext";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { useIntl } from "react-intl";
import Loading from "../../components/Loading";

interface LocationState {
  query: string;
}

const SearchPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const [query, setQuery] = useState(
    location.state !== undefined ? location.state.query : ""
  );
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const [displayType] = useContext(ViewContext);
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const intl = useIntl();
  const { movies, hasMore, loading, error } = useMovieSearch(query, page, year);
  const lastMovieElementRef = useInfinityScroll(setPage, hasMore, loading);

  const getMovieID = (id: number): void => {
    setSelectedMovieID(id);
    window.scrollTo(0, 0);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    setPage(1);
  };
  useEffect(() => {
    if (location?.state) {
      setQuery(location.state.query);
    }
  }, [location]);
  return (
    <>
      <div className="search-inputs">
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "Query",
            defaultMessage: "Query...",
          })}
          value={query}
          onChange={handleQuery}
        />
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "Year",
            defaultMessage: "Year...",
          })}
          value={year}
          inputMode="tel"
          onChange={handleYear}
        />
      </div>
      <div className={displayType === "grid" ? "wrap grid" : "wrap"}>
        {movies.map((movie, index) => {
          const { id } = movie;

          return (
            <div
              {...(movies.length === index + 1
                ? { ref: lastMovieElementRef }
                : null)}
              key={id}
            >
              <DisplayMovie onClick={getMovieID} movie={movie} />
            </div>
          );
        })}

        <div>{loading && <Loading />}</div>
        <div>{error && "Error"}</div>
      </div>
    </>
  );
};

export default SearchPage;
