import React, { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
const DisplayMovie = ({ movie, onClick }) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
  } = movie;
  const [displayType] = useContext(ViewContext);

  const shortTitle = (title, length = 45) =>
    title.length >= length ? title.slice(0, length) + "..." : title;

  //! FLEX
  if (displayType === "flex")
    return (
      <div className="movie" onClick={() => onClick(id)}>
        <div className="img">
          <img
            width="150px"
            height="auto"
            src={
              !poster_path
                ? "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
                : `https://image.tmdb.org/t/p/w500${poster_path}`
            }
            alt={title}
          />
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
    <div className="grid-movie" onClick={() => onClick(id)}>
      <div className="grid-image">
        <img
          src={
            !poster_path
              ? "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
              : `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`
          }
          alt={title}
        />
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
