import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import { FormattedMessage } from "react-intl";

const Genres = () => {
  const params = useParams();
  const [genres, setGenres] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [language] = useContext(LanguageContext);

  const capitalizeFirstLetter = (word) =>
    word?.charAt(0).toUpperCase() + word?.toLowerCase().slice(1);

  const styledSelect = params.genre
    ? { color: "rgb(255, 0, 121)", borderBottom: "1px solid rgb(255, 0, 121)" }
    : null;
  const styledOption = (equal) =>
    capitalizeFirstLetter(params.genre) === capitalizeFirstLetter(equal)
      ? { color: "rgb(255, 0, 121)" }
      : null;

  const getGenres = () => {
    setLoading(true);
    const URL = `genre/movie/list?`;
    api
      .get(URL, { params: { language } })
      .then((res) => {
        let { genres } = res.data;
        setGenres(genres);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const getSelectValue = () => {
    if (params.genre === "All") return "All";
    if (params.genre) return params.genre;
    else if (language === "pl") return "Gatunek";
    else return "Genre";
  };
  useEffect(() => {
    getGenres();
    // eslint-disable-next-line
  }, [language]);
  return (
    <div>
      <select
        value={getSelectValue()}
        onChange={(e) => (window.location.href = `/movies/${e.target.value}`)}
        id="genres"
        style={styledSelect}
      >
        <FormattedMessage id="Genre" defaultMessage="Genre">
          {(message) => <option disabled>{message}</option>}
        </FormattedMessage>
        <FormattedMessage id="All" defaultMessage="All">
          {(message) => (
            <option value="All" key="All" style={styledOption("all")}>
              {message}
            </option>
          )}
        </FormattedMessage>

        {genres.map((genre) => {
          const { name } = genre;
          return (
            <option key={name} style={styledOption(name)} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Genres;
