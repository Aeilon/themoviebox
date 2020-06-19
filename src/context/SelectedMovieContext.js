import React, { createContext, useState, useEffect } from "react";

export const SelectedMovieContext = createContext();

const SelectedMovieProvider = ({ children }) => {
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  useEffect(() => {
    localStorage.setItem("selected-movie", selectedMovieID);
  }, [selectedMovieID]);

  return (
    <SelectedMovieContext.Provider
      value={[selectedMovieID, setSelectedMovieID]}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
};

export default SelectedMovieProvider;
