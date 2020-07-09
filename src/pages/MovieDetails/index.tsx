import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { FormattedMessage } from "react-intl";
import ImageLoading from "../../components/ImageLoading";
import noImage from "../../images/noImage.jpg";

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

interface Params {
  id: string;
}

const MovieDetails: React.FC = () => {
  const params = useParams<Params>();
  const { data } = useMovieDetails(params);
  // eslint-disable-next-line
  const [selectedMovieID, setSelectedMovieID] = useContext(
    SelectedMovieContext
  );
  const [isImageLoaded, toggleImageLoaded] = useState(false);

  const handleOnLoad = () => toggleImageLoaded(true);

  const {
    poster_path,
    title,
    overview,
    popularity,
    tagline,
    budget,
    original_language,
    release_date,
    original_title,
  } = data;

  const getImage = (link: string): string => {
    if (!poster_path) return noImage;
    return `${link}${poster_path}`;
  };

  useEffect(() => {
    setSelectedMovieID(params.id);
    // eslint-disable-next-line
  }, [params]);
  return (
    <div className="wrap">
      <div className="details-wrap">
        <div className="details-img">
          <img
            style={isImageLoaded ? {} : { display: "none" }}
            src={getImage("https://image.tmdb.org/t/p/w500")}
            alt={title}
            onLoad={() => handleOnLoad()}
          />
          {!isImageLoaded && <ImageLoading />}
        </div>

        <div className="details-data">
          <h1>{title}</h1>
          <h2>{tagline}</h2>
          <h4>{overview}</h4>
          <h3>
            <FormattedMessage id="Popularity" defaultMessage="Popularity:" />{" "}
            {popularity}
          </h3>
          <h3>
            <FormattedMessage id="Budget" defaultMessage="Budget:" />{" "}
            {budget
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(budget)
              : null}
          </h3>

          <h3>
            <FormattedMessage
              id="Original Language"
              defaultMessage="Original Language:"
            />{" "}
            {original_language}
          </h3>
          <h3>
            <FormattedMessage
              id="Original Title"
              defaultMessage="Original Title:"
            />{" "}
            {original_title}
          </h3>
          <h2>{release_date}</h2>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
