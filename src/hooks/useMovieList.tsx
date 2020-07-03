import { useEffect, useState, useContext } from "react";
import axios, { Canceler } from "axios";
import api from "../api/api";
import { LanguageContext } from "../context/LanguageContext";

interface Params {
  genre: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

const useMovieList = (page: number, params: Params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [language] = useContext(LanguageContext);

  const capitalizeFirstLetter = (word: string): string => {
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
    let cancel: Canceler;
    const genreURL = `genre/movie/list?`;
    const discoverURL = `discover/movie?`;

    api.get(genreURL).then((response) => {
      let { genres } = response.data;
      const genre = genres.filter((genre: Genre) => validParam === genre.name);
      if (genre.length === 0 && validParam !== "All") {
        return (window.location.href = "/movies/All");
      }

      const genreID = genre[0]?.id;
      api
        .get(discoverURL, {
          params: { page, with_genres: genreID },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })

        .then((res) => {
          setMovies((prevMovies) => [
            ...new Set([...prevMovies, ...res.data.results]),
          ]);
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
