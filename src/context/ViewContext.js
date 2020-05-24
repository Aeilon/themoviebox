import React, { createContext, useState, useEffect } from "react";

export const ViewContext = createContext();

const ViewProvider = (props) => {
  const [displayType, setDisplayType] = useState(
    localStorage.getItem("display-type") || "grid"
  );

  useEffect(() => {
    localStorage.setItem("display-type", displayType);
  }, [displayType]);

  return (
    <ViewContext.Provider value={[displayType, setDisplayType]}>
      {props.children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
