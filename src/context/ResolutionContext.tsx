import React, { createContext, useState, useEffect } from "react";

type Context = [boolean];

export const ResolutionContext = createContext<Context>(null!);

interface Props {
  children: React.ReactNode;
}

const ResolutionProvider: React.FC<Props> = ({ children }) => {
  const [isMobile, toggleMobile] = useState(
    window.matchMedia("(max-width:1025px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      toggleMobile(window.matchMedia("(max-width:1025px)").matches);
    });
  }, []);

  return (
    <ResolutionContext.Provider value={[isMobile]}>
      {children}
    </ResolutionContext.Provider>
  );
};

export default ResolutionProvider;
