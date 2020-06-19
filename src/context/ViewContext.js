import React, { createContext, useState, useEffect } from "react";

export const ViewContext = createContext();

const ViewProvider = ({ children }) => {
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
