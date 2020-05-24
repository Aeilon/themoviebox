import React, { createContext, useState, useEffect } from "react";

export const SelectedMovieContext = createContext();

const SelectedMovieProvider = (props) => {
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  useEffect(() => {
    localStorage.setItem("selected-movie", selectedMovieID);
  }, [selectedMovieID]);

  return (
    <SelectedMovieContext.Provider
      value={[selectedMovieID, setSelectedMovieID]}
    >
      {props.children}
    </SelectedMovieContext.Provider>
  );
};

export default SelectedMovieProvider;
