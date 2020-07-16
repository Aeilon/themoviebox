import React from "react";
import App from "../App";
import SelectedMovieProvider from "../context/SelectedMovieContext";
import ViewProvider from "../context/ViewContext";
import ResolutionProvider from "../context/ResolutionContext";
import LanguageProvider from "../context/LanguageContext";
import { ThemeProvider } from "styled-components";
import Theme from "../context/theme";

const Root: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <LanguageProvider>
        <SelectedMovieProvider>
          <ResolutionProvider>
            <ViewProvider>
              <App />
            </ViewProvider>
          </ResolutionProvider>
        </SelectedMovieProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Root;
