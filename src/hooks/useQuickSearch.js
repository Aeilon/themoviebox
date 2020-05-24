import { useEffect, useState, useContext } from "react";
import axios from "axios";
import api from "../utilites/api";
import { LanguageContext } from "../context/LanguageContext";
export default function useQuickSearch(query) {
  const [movies, setMovies] = useState([]);
  const [language] = useContext(LanguageContext);
  useEffect(() => {
    setMovies([]);
  }, [query, language]);

  useEffect(() => {
    if (query.length >= 3) {
      let cancel;

      const URL = `search/movie?`;
      api
        .get(URL, {
          params: { query, page: 1},
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        .then((res) => {
          setMovies(res.data.results.splice(0, 6));
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      return () => cancel();
    }
  }, [query, language]);

  return { movies };
}
