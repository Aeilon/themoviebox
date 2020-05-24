import React, { useContext } from "react";
import { SelectedMovieContext } from "../../../context/SelectedMovieContext";
import {FormattedMessage} from 'react-intl'
const MovieMetaData = ({
  metaData,
  genres,
}) => {
  const {
    title,
    vote_average,
    vote_count,
    runtime,
  } = metaData;
  const [selectedMovieID] = useContext(
    SelectedMovieContext
  );
  const timeConvert = (n) => {
    const hours = Math.floor(n / 60);
    const minutes = n % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <div
      className="movie-metadata"
      style={!selectedMovieID ? { display: "none" } : null}
    >
      <div className="metadata">
        <div className="movie-title">
          <span> {title}</span>
        </div>
        <div className="movie-genres">
          {genres.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
          <li><FormattedMessage id="Duration" defaultMessage="Duration:" /> {timeConvert(runtime)}</li>
        </div>

        <button
          onClick={() => (window.location.href = `/movie/${selectedMovieID}`)}
        >
         <FormattedMessage id="button-show" defaultMessage="SHOW MORE"/>
        </button>
      </div>

      
        <div className="rating">
          <FormattedMessage id="Rating" defaultMessage="Rating based on {vote_count} reviews" values={{vote_count}} />
         <div className="rating-box"><h2>{vote_average}</h2></div>
        </div>
      
    </div>
  );
};
export default MovieMetaData;
