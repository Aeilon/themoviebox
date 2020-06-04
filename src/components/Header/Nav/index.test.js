import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import Nav from "../Nav";
import TabBar from "../../TabBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SelectedMovieProvider from "../../../context/SelectedMovieContext";
import ResolutionProvider from "../../../context/ResolutionContext";
import LanguageProvider from "../../../context/LanguageContext";
import ViewProvider from "../../../context/ViewContext";
import { IntlProvider } from "react-intl";

describe("Nav", () => {
  const tree = (
    <ResolutionProvider>
      <ViewProvider>
        <LanguageProvider>
          <SelectedMovieProvider>
            <IntlProvider locale="en">
              <Router>
                <Switch>
                  <Route>
                    <TabBar />
                    <Nav />
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
    expect(getByText("THEMOVIE")).toBeInTheDocument();
  });
  it("tests the wrong value entered", async () => {
    const { getByTestId, getByText } = render(tree);
    const clickInput = getByTestId("click-input");
    fireEvent.click(clickInput);
    const input = getByTestId("quick-search-input");
    await act(async () => {
      fireEvent.change(input, { target: { value: "dasdasdasdas" } });
    });
    const textNode = await waitFor(() => getByText("No Results"));
    expect(textNode).toBeInTheDocument();
  });
  it("tests the value entered", async () => {
    const { getByTestId, getByText } = render(tree);
    const clickInput = getByTestId("click-input");
    fireEvent.click(clickInput);
    const input = getByTestId("quick-search-input");
    await act(async () => {
      fireEvent.change(input, { target: { value: "avengers" } });
    });
    const textNode = await waitFor(() => getByText("Show More"));
    expect(textNode).toBeInTheDocument();
  });
  it("tests the change of language", async () => {
    const { getByAltText, debug, getByText } = render(tree);
    const flag = getByAltText("Poland");
    await act(async () => {
      await fireEvent.click(flag);
    });
    const textNode = await waitFor(() => getByText("Akcja"));
    expect(textNode).toBeInTheDocument();
  });
});
