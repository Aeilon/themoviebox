import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

interface Params {
  genre: string;
}

interface StyledSelect {
  params: Params;
  theme: {
    colors: {
      mainColor: string;
      secondaryColor: string;
    };
  };
}

interface StyledOption {
  params: Params;
  capitalizeFirstLetter: (word: string) => string;
  arg: string;
  theme: {
    colors: {
      mainColor: string;
      secondaryColor: string;
    };
  };
}

const StyledSelect = styled.select`
  color: ${({ theme, params }: StyledSelect) =>
    params.genre ? theme.colors.mainColor : theme.colors.secondaryColor};

  border: 1px solid white;

  border-bottom: ${({ theme, params }: StyledSelect) =>
    params.genre
      ? `1px solid ${theme.colors.mainColor}`
      : `1px solid ${theme.colors.secondaryColor}`};

  &:hover {
    color: ${({ theme }) => theme.colors.mainColor};
    border-bottom: ${({ theme }) => theme.colors.maincolor};
  }
`;

const StyledOption = styled.option`
  color: ${({ theme, params, capitalizeFirstLetter, arg }: StyledOption) =>
    capitalizeFirstLetter(params.genre) === capitalizeFirstLetter(arg)
      ? theme.colors.mainColor
      : theme.colors.secondaryColor};
`;

const Genres: React.FC = () => {
  const params = useParams<Params>();
  const [genres, setGenres] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [language] = useContext(LanguageContext);

  const capitalizeFirstLetter = (word: string): string =>
    word?.charAt(0).toUpperCase() + word?.toLowerCase().slice(1);

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
      <StyledSelect
        params={params}
        value={getSelectValue()}
        onChange={(e) => (window.location.href = `/movies/${e.target.value}`)}
        id="genres"
      >
        <FormattedMessage id="Genre" defaultMessage="Genre">
          {(message) => <option disabled>{message}</option>}
        </FormattedMessage>
        <FormattedMessage id="All" defaultMessage="All">
          {(message) => (
            <StyledOption
              arg={"all"}
              capitalizeFirstLetter={capitalizeFirstLetter}
              params={params}
              value="All"
              key="All"
            >
              {message}
            </StyledOption>
          )}
        </FormattedMessage>

        {genres.map((genre) => {
          const { name } = genre;
          return (
            <StyledOption
              key={name}
              capitalizeFirstLetter={capitalizeFirstLetter}
              params={params}
              arg={name}
              value={name}
            >
              {name}
            </StyledOption>
          );
        })}
      </StyledSelect>
    </div>
  );
};

export default Genres;
