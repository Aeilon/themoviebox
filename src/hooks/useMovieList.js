import { useEffect, useState, useContext } from "react";
import axios from "axios";
import api from "../api/api";
import { LanguageContext } from "../context/LanguageContext";

const useMovieList = (page, params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [language] = useContext(LanguageContext);
  const capitalizeFirstLetter = (word) => {
    if (word === "Science Fiction") return word;
    if (word === "TV Movie") return word;
    if (word === "Sci-Fi") return word;
    if (word === "film TV") return word;
    return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  };

  const validParam = capitalizeFirstLetter(params.genre);

  useEffect(() => {
    setMovies([]);
  }, [params, language]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const URL = `genre/movie/list?`;
    const URL2 = `discover/movie?`;

    api.get(URL).then((response) => {
      let { genres } = response.data;
      const genre = genres.filter((genre) => validParam === genre.name);
      if (genre.length === 0 && validParam !== "All") {
        return (window.location.href = "/movies/All");
      }

      const genreID = genre[0]?.id;
      api
        .get(URL2, {
          params: { page, with_genres: genreID },
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
    });

    return () => cancel();
    // eslint-disable-next-line
  }, [page, params, language]);

  return { loading, error, movies, hasMore };
};
export default useMovieList;
