import React from "react";
import { render, screen } from "@testing-library/react";
import Genres from "../components/Genres";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LanguageProvider from "../context/LanguageContext";
import Theme from "../context/theme";
import { ThemeProvider } from "styled-components";
import English from "../languages/en.json";
import ResolutionProvider from "../context/ResolutionContext";
import ViewProvider from "../context/ViewContext";

describe("Genres", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  const tree = (
    <ThemeProvider theme={Theme}>
      <LanguageProvider>
        <IntlProvider locale="en" messages={English}>
          <ResolutionProvider>
            <ViewProvider>
              <Router>
                <Switch>
                  <Route>
                    <Genres />
                  </Route>
                </Switch>
              </Router>
            </ViewProvider>
          </ResolutionProvider>
        </IntlProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
  it("should render Genres", async () => {
    render(tree);
  });
});
