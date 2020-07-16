import React, { useContext, useState } from "react";
import { ViewContext } from "../../context/ViewContext";
import noImage from "../../images/noImage.jpg";
import ImageLoading from "../ImageLoading";
import { ResolutionContext } from "../../context/ResolutionContext";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

interface Props {
  movie: Movie;
  onClick: (id: number) => void;
}

interface StyledImage {
  isImageLoaded: boolean;
}

const StyledImage = styled.img`
  display: ${({ isImageLoaded }: StyledImage) =>
    isImageLoaded ? "block" : "none"};
`;

const DisplayMovie: React.FC<Props> = ({ movie, onClick }) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
  } = movie;
  const [displayType] = useContext(ViewContext);
  const [isImageLoaded, toggleImageLoaded] = useState(false);
  const [isMobile] = useContext(ResolutionContext);

  const handleOnLoad = () => toggleImageLoaded(true);

  const shortTitle = (title: string, length = 45): string =>
    title.length >= length ? title.slice(0, length) + "..." : title;

  const getImage = (link: string): string => {
    if (!poster_path) return noImage;
    return `${link}${poster_path}`;
  };

  const getDescription = (description: string): JSX.Element | string => {
    if (description) return description;
    return (
      <FormattedMessage
        id="Description"
        defaultMessage="Description not available."
      />
    );
  };

  //! FLEX
  if (displayType === "flex")
    return (
      <div
        data-testid="view-test"
        className="movie"
        onClick={() => onClick(id)}
      >
        <div className="img">
          <StyledImage
            isImageLoaded={isImageLoaded}
            width="150px"
            height="auto"
            src={getImage(
              isMobile
                ? "https://image.tmdb.org/t/p/w185"
                : "https://image.tmdb.org/t/p/w342"
            )}
            alt={title}
            onLoad={() => handleOnLoad()}
          />
          {!isImageLoaded && <ImageLoading />}
        </div>
        <div className="details">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="description">
            <h5>{getDescription(overview)}</h5>
          </div>
          <div className="date">
            <h3>{release_date}</h3>
          </div>
        </div>
      </div>
    );
  //? GRID
  return (
    <div
      data-testid="view-test"
      className="grid-movie"
      onClick={() => onClick(id)}
    >
      <div className="grid-image">
        <StyledImage
          src={getImage(
            isMobile
              ? "https://image.tmdb.org/t/p/w185"
              : "https://image.tmdb.org/t/p/w342"
          )}
          isImageLoaded={isImageLoaded}
          alt={title}
          onLoad={() => handleOnLoad()}
        />
        {!isImageLoaded && <ImageLoading />}
      </div>
      <div className="grid-details">
        <div className="grid-title">
          <h4>{shortTitle(title)}</h4>
        </div>

        <div className="grid-rate">
          <div className="rate">{vote_average}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMovie;
