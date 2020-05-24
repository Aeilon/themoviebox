import { useEffect, useState, useContext } from "react";
import api from "../utilites/api";
import {SelectedMovieContext} from '../context/SelectedMovieContext';
import {LanguageContext} from '../context/LanguageContext';

const useMetaData = () => {
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedMovieID] = useContext(SelectedMovieContext);
  const [language] = useContext(LanguageContext);
  useEffect(() => {
    if(!selectedMovieID) return;
    const URL = `movie/${selectedMovieID}?`;
    api
      .get(URL)
      .then((response) => {
        setData(response.data);
        setGenres(response.data.genres);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [selectedMovieID,language]);

  return { data, genres };
};
export default useMetaData;
