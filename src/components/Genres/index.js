import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../utilites/api";
import { LanguageContext } from "../../context/LanguageContext";
import { FormattedMessage } from "react-intl";

const Genres = () => {
  const params = useParams();
  const [genres, setGenres] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [language] = useContext(LanguageContext);
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
  const capitalizeFirstLetter = (word) =>
    word?.charAt(0).toUpperCase() + word?.toLowerCase().slice(1);

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
        style={{
          color: params.genre ? "rgb(255, 0, 121)" : "rgb(128, 129, 138)",
          borderBottom: params.genre
            ? "1px solid rgb(255, 0, 121)"
            : "1px solid white",
        }}
        onChange={(e) => (window.location.href = `/movies/${e.target.value}`)}
        id="genres"
      >
        <FormattedMessage id="Genre" defaultMessage="Genre">
          {(message) => <option disabled>{message}</option>}
        </FormattedMessage>
        <FormattedMessage id="All" defaultMessage="All">
          {(message) => (
            <option
              value="All"
              key="All"
              style={{
                color:
                  capitalizeFirstLetter(params.genre) ===
                  capitalizeFirstLetter("all")
                    ? "rgb(255, 0, 121)"
                    : "rgb(128, 129, 138)",
              }}
            >
              {message}
            </option>
          )}
        </FormattedMessage>

        {genres.map((genre) => {
          const { name } = genre;
          return (
            <option
              key={name}
              style={{
                color:
                  capitalizeFirstLetter(params.genre) ===
                  capitalizeFirstLetter(name)
                    ? "rgb(255, 0, 121)"
                    : "rgb(128, 129, 138)",
              }}
              value={name}
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Genres;
