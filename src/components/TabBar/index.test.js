import React, { useContext } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import TabBar from "./index";
import SelectedMovieProvider from "../../context/SelectedMovieContext";
import ResolutionProvider from "../../context/ResolutionContext";
import LanguageProvider from "../../context/LanguageContext";
import ViewProvider, { ViewContext } from "../../context/ViewContext";
import { IntlProvider } from "react-intl";
import DisplayMovie from "../DisplayMovie";
import validMovie from "../../__mocks__/validMovie.json";
describe("TabBar", () => {
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
    <ResolutionProvider isMobile={true}>
      <ViewProvider>
        <LanguageProvider>
          <SelectedMovieProvider>
            <IntlProvider locale="en">
              <Router>
                <Switch>
                  <Route>
                    <TabBar />
                    <DisplayMovie movie={validMovie} />
                  </Route>
                </Switch>
              </Router>
            </IntlProvider>
          </SelectedMovieProvider>
        </LanguageProvider>
      </ViewProvider>
    </ResolutionProvider>
  );
  it("test component rendering", async () => {
    const { getByText } = render(tree);
    expect(getByText("Popular")).toBeInTheDocument();
  });
  it("test select with genres rendering", async () => {
    const { getByText } = render(tree);
    const textNode = await waitFor(() => getByText("Fantasy"));
    expect(textNode).toBeInTheDocument();
  });
  it("tests ViewContext", () => {
    const TestComponent = () => {
      const [displayType, setDisplayType] = useContext(ViewContext);
      return (
        <>
          <div>
            <h1 data-testid="test-content">{displayType.toString()}</h1>
            <button onClick={() => setDisplayType("flex")}></button>
          </div>
        </>
      );
    };
    const { getByTestId, getByRole } = render(
      <ViewProvider>
        <TestComponent />
      </ViewProvider>
    );
    expect(getByTestId("test-content")).toHaveTextContent("grid");
    act(() => {
      fireEvent.click(getByRole("button"));
    });
    expect(getByTestId("test-content")).toHaveTextContent("flex");
  });
  it("tests the change of view", async () => {
    const { getByTestId, getByAltText } = render(tree);
    const div = getByTestId("view-test");
    const button = getByAltText("grid");
    expect(div).toHaveClass("movie");
    act(() => {
      fireEvent.click(button);
    });
    expect(div).toHaveClass("grid-movie");
  });
});
