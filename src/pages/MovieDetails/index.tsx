import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { FormattedMessage } from "react-intl";

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

  useEffect(() => {
    setSelectedMovieID(params.id);
    // eslint-disable-next-line
  }, [params]);
  return (
    <div className="wrap">
      <div className="details-wrap">
        <div className="details-img">
          <img
            src={
              !poster_path
                ? "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                : `https://image.tmdb.org/t/p/w500${poster_path}`
            }
            alt={title}
          />
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
