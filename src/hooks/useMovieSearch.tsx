import { useEffect, useState, useContext } from "react";
import axios, { Canceler } from "axios";
import api from "../api/api";
import { LanguageContext } from "../context/LanguageContext";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

const useMovieSearch = (query: string, page: number, year: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [language] = useContext(LanguageContext);

  useEffect(() => {
    setMovies([]);
  }, [query, year, language]);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      setError(false);
      let cancel: Canceler;
      const URL = `search/movie?`;
      api
        .get(URL, {
          params: { query, page, year },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        .then((res) => {
          setMovies((prevMovies) => {
            return [...new Set([...prevMovies, ...res.data.results])];
          });
          setHasMore(res.data.results.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });

      return () => cancel();
    }
  }, [query, page, year, language]);

  return { loading, error, movies, hasMore };
};

export default useMovieSearch;
