import React, { useContext, useState } from "react";
import { ViewContext } from "../../context/ViewContext";
import noImage from "../../images/noImage.jpg";
import ImageLoading from "../ImageLoading";

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

  const handleOnLoad = () => toggleImageLoaded(true);

  const shortTitle = (title: string, length = 45): string =>
    title.length >= length ? title.slice(0, length) + "..." : title;

  const getImage = (link: string): string => {
    if (!poster_path) return noImage;
    return `${link}${poster_path}`;
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
          <img
            style={isImageLoaded ? {} : { display: "none" }}
            width="150px"
            height="auto"
            src={getImage("https://image.tmdb.org/t/p/w500")}
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
            <h5>{overview}</h5>
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
        <img
          src={getImage("https://image.tmdb.org/t/p/w300_and_h450_bestv2")}
          style={isImageLoaded ? {} : { display: "none" }}
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
