import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import DisplayMovie from "../../components/DisplayMovie";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import useMovieEndpoint from "../../hooks/useMovieEndpoint";
import TabBar from "../../components/TabBar";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { ViewContext } from "../../context/ViewContext";
import { ResolutionContext } from "../../context/ResolutionContext";
import Loading from "../../components/Loading";

interface Params {
  endpoint: string;
}

const MovieEndpoint: React.FC = () => {
  const params = useParams<Params>();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const [displayType] = useContext(ViewContext);
  const [isMobile] = useContext(ResolutionContext);
  const { movies, hasMore, loading, error } = useMovieEndpoint(page, params);
  const lastMovieElementRef = useInfinityScroll(setPage, hasMore, loading);

  const getMovieID = (id: number): void => {
    setSelectedMovieID(id);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (movies.length < 21) setSelectedMovieID(movies[0]?.id);
    // eslint-disable-next-line
  }, [movies]);

  useEffect(() => {
    setPage(1);
  }, [params]);
  return (
    <div>
      {isMobile ? null : <TabBar />}
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
      </div>

      {loading && <Loading />}

      <div>{error && "Error"}</div>
    </div>
  );
};
export default MovieEndpoint;
