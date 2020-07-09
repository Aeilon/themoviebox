import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import DisplayMovie from "../../components/DisplayMovie";
import useMovieList from "../../hooks/useMovieList";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import TabBar from "../../components/TabBar";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { ViewContext } from "../../context/ViewContext";
import { ResolutionContext } from "../../context/ResolutionContext";
import Loading from "../../components/Loading";

interface Params {
  genre: string;
}
const MovieList: React.FC = () => {
  const params = useParams<Params>();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const [isMobile] = useContext(ResolutionContext);
  const [displayType] = useContext(ViewContext);
  const { movies, hasMore, loading, error } = useMovieList(page, params);
  const lastMovieElementRef = useInfinityScroll(setPage, hasMore, loading);

  const getMovieID = (id: number): void => {
    setSelectedMovieID(id);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setPage(1);
  }, [params]);

  useEffect(() => {
    if (movies.length < 21) setSelectedMovieID(movies[0]?.id);
    // eslint-disable-next-line
  }, [movies]);
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
export default MovieList;
