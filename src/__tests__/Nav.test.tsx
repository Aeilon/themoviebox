import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Nav from "../components/Header/Nav";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LanguageProvider from "../context/LanguageContext";
import Theme from "../context/theme";
import { ThemeProvider } from "styled-components";
import English from "../languages/en.json";
import Polish from "../languages/pl.json";
import ResolutionProvider from "../context/ResolutionContext";
import SelectedMovieProvider from "../context/SelectedMovieContext";
import ViewProvider from "../context/ViewContext";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { waitForDebugger } from "inspector";

describe("Nav", () => {
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
      <SelectedMovieProvider>
        <LanguageProvider>
          <IntlProvider locale="en" messages={English}>
            <ResolutionProvider>
              <ViewProvider>
                <Router>
                  <Switch>
                    <Route>
                      <Nav />
                    </Route>
                  </Switch>
                </Router>
              </ViewProvider>
            </ResolutionProvider>
          </IntlProvider>
        </LanguageProvider>
      </SelectedMovieProvider>
    </ThemeProvider>
  );
  it("should render Nav", async () => {
    const { getByAltText, debug, getByText } = render(tree);
    const flag = getByAltText("Poland");
    act(() => {
      fireEvent.click(flag);
    });
    await waitFor(() => debug());
    expect(screen.getByPlaceholderText(/Search/)).toHaveAttribute(
      "placeholder"
    );
  });
});
