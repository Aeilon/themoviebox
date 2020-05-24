import React , {createContext,useState,useEffect} from 'react';

export const ResolutionContext = createContext();

const ResolutionProvider = props => {
    const [isMobile, toggleMobile] = useState(
        window.matchMedia("(max-width:1025px)").matches
      );
      useEffect(() => {
        window.addEventListener("resize", () => {
          toggleMobile(window.matchMedia("(max-width:1025px)").matches);
        });
      }, []);
    return(
        <ResolutionContext.Provider value={[isMobile]}>
            {props.children}
        </ResolutionContext.Provider>
    );
}

export default ResolutionProvider;