import { useEffect, useState, useContext } from "react";
import axios from "axios";
import api from "../utilites/api";
import { LanguageContext } from "../context/LanguageContext";

const useMovieEndpoint = (page, params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [language] = useContext(LanguageContext);
  const endpoints = ["popular", "upcoming", "top_rated"];
  const endpoint = params.endpoint.toLowerCase();

  useEffect(() => {
    setMovies([]);
  }, [params, language]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const validEndpoint = endpoints.filter((e) => e === endpoint);
    if (validEndpoint.length === 0) window.location.href = "/";

    const URL = `movie/${endpoint}?`;
    api
      .get(URL, {
        params: { page },
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
    // eslint-disable-next-line
  }, [page, language]);

  return { loading, error, movies, hasMore };
};

export default useMovieEndpoint;
