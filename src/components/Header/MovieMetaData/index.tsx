import React, { useContext } from "react";
import { SelectedMovieContext } from "../../../context/SelectedMovieContext";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

interface Genre {
  name: string;
}

interface Movie {
  title?: string;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
  backdrop_path?: string;
}

interface Props {
  metaData: Movie;
  genres: Genre[];
}

interface HeaderImage {
  selectedMovieID?: string | number;
}

const HeaderImage = styled.div`
display: ${({ selectedMovieID }: HeaderImage) =>
  !selectedMovieID ? "none" : "flex"} }
`;

const MovieMetaData: React.FC<Props> = ({ metaData, genres }) => {
  const { title, vote_average, vote_count, runtime } = metaData;
  const [selectedMovieID] = useContext(SelectedMovieContext);

  const timeConvert = (n?: number): string | undefined => {
    if (!n) return;
    const hours = Math.floor(n / 60);
    const minutes = n % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <HeaderImage className="movie-metadata" selectedMovieID={selectedMovieID}>
      <div className="metadata">
        <div className="movie-title">
          <span> {title}</span>
        </div>

        <div className="movie-genres">
          {genres.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
          <li>
            <FormattedMessage id="Duration" defaultMessage="Duration:" />{" "}
            {timeConvert(runtime)}
          </li>
        </div>

        <button
          onClick={() => (window.location.href = `/movie/${selectedMovieID}`)}
        >
          <FormattedMessage id="button-show" defaultMessage="SHOW MORE" />
        </button>
      </div>

      <div className="rating">
        <FormattedMessage
          id="Rating"
          defaultMessage="Rating based on {vote_count} reviews"
          values={{ vote_count }}
        />
        <div className="rating-box">
          <h2>{vote_average}</h2>
        </div>
      </div>
    </HeaderImage>
  );
};
export default MovieMetaData;
