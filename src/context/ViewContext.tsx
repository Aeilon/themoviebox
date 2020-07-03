import React, { createContext, useState, useEffect } from "react";

type Context = [string, React.Dispatch<React.SetStateAction<string>>];

export const ViewContext = createContext<Context>(null!);

interface Props {
  children: React.ReactNode;
}

const ViewProvider: React.FC<Props> = ({ children }) => {
  const [displayType, setDisplayType] = useState(
    localStorage.getItem("display-type") || "grid"
  );

  useEffect(() => {
    localStorage.setItem("display-type", displayType);
  }, [displayType]);

  return (
    <ViewContext.Provider value={[displayType, setDisplayType]}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
