import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import { FormattedMessage } from "react-intl";
import ImageLoading from "../../components/ImageLoading";
import noImage from "../../images/noImage.jpg";
import styled from "styled-components";

interface StyledImage {
  isImageLoaded: boolean;
}

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  display: ${({ isImageLoaded }: StyledImage) =>
    isImageLoaded ? "block" : "none"};
`;

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

  const formattedBudget = (budget: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(budget);
  };

  const getDescription = (description?: string): JSX.Element | string => {
    if (description) return description;
    return (
      <FormattedMessage
        id="Description"
        defaultMessage="Description not available."
      />
    );
  };

  useEffect(() => {
    setSelectedMovieID(params.id);
    // eslint-disable-next-line
  }, [params]);
  return (
    <div className="wrap">
      <div className="details-wrap">
        <div className="details-img">
          <StyledImage
            src={getImage("https://image.tmdb.org/t/p/w500")}
            alt={title}
            isImageLoaded={isImageLoaded}
            onLoad={() => handleOnLoad()}
          />
          {!isImageLoaded && <ImageLoading />}
        </div>

        <div className="details-data">
          <h1>{title}</h1>
          <h2>{tagline}</h2>
          <h4>{getDescription(overview)}</h4>
          <h3>
            <FormattedMessage id="Popularity" defaultMessage="Popularity:" />{" "}
            {popularity}
          </h3>
          <h3>
            <FormattedMessage id="Budget" defaultMessage="Budget:" />{" "}
            {budget ? formattedBudget(budget) : null}
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
