import React, { createContext, useState, useEffect } from "react";

type Context = [
  number | undefined | string,
  React.Dispatch<React.SetStateAction<number | undefined | string>>
];

export const SelectedMovieContext = createContext<Context>(null!);

interface Props {
  children: React.ReactNode;
}

const SelectedMovieProvider: React.FC<Props> = ({ children }) => {
  const [selectedMovieID, setSelectedMovieID] = useState<
    number | undefined | string
  >(undefined);

  useEffect(() => {
    localStorage.setItem("selected-movie", `${selectedMovieID}`);
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
