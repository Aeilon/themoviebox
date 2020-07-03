import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { LanguageContext } from "../context/LanguageContext";

interface Params {
  id: string;
}
interface Movie {
  poster_path?: string;
  title?: string;
  overview?: string;
  popularity?: number;
  tagline?: string;
  budget?: number;
  original_language?: string;
  release_date?: string;
  original_title?: string;
}

const useMovieDetails = (params: Params) => {
  const [data, setData] = useState<Movie>({});
  const [genres, setGenres] = useState([]);
  const [language] = useContext(LanguageContext);

  useEffect(() => {
    const URL = `movie/${params.id}?`;
    api
      .get(URL)
      .then((response) => {
        setData(response.data);
        setGenres(response.data.genres);
      })

      .catch((e) => {
        console.error(e);
      });
  }, [params, language]);

  return { data, genres };
};

export default useMovieDetails;
