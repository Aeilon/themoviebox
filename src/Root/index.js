import React from "react";
import App from "../App";
import SelectedMovieProvider from "../context/SelectedMovieContext";
import ViewProvider from "../context/ViewContext";
import ResolutionProvider from "../context/ResolutionContext";
import LanguageProvider from "../context/LanguageContext";
const Root = () => {
  return (
    <LanguageProvider>
      <SelectedMovieProvider>
        <ResolutionProvider>
          <ViewProvider>
            <App />
          </ViewProvider>
        </ResolutionProvider>
      </SelectedMovieProvider>
    </LanguageProvider>
  );
};

export default Root;
