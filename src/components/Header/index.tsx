import React, { useContext } from "react";
import Nav from "./Nav";
import MovieMetaData from "./MovieMetaData";
import useMetaData from "../../hooks/useMetaData";
import { SelectedMovieContext } from "../../context/SelectedMovieContext";
import header from "../../images/header.jpg";
import { ResolutionContext } from "../../context/ResolutionContext";

const Header: React.FC = () => {
  const { data, genres } = useMetaData();
  const { backdrop_path } = data;
  const [selectedMovieID] = useContext(SelectedMovieContext);
  const [isMobile] = useContext(ResolutionContext);

  const getImage = (path?: string) => {
    if (!selectedMovieID || !path) return { backgroundImage: `url(${header})` };
    if (isMobile)
      return {
        backgroundImage: `url(https://image.tmdb.org/t/p/w780${path})`,
      };
    return {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${path})`,
    };
  };
  return (
    <header style={getImage(backdrop_path)}>
      <Nav />
      <MovieMetaData metaData={data} genres={genres} />
    </header>
  );
};
export default Header;
