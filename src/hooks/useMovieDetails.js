import { useEffect, useState, useContext } from "react";
import api from "../utilites/api";
import { LanguageContext } from "../context/LanguageContext";

const useMovieDetails = (params) => {
  const [data, setData] = useState({});
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
