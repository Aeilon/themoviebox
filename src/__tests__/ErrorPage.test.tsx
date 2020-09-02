import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../components/ErrorPage";
import { IntlProvider } from "react-intl";
import Polish from "../languages/pl.json";

describe("ErrorPage", () => {
  it("should render ErrorPage", () => {
    render(
      <IntlProvider locale="pl" messages={Polish}>
        <ErrorPage />
      </IntlProvider>
    );
    expect(screen.getByText("Coś poszło nie tak!")).toBeInTheDocument();
  });
});
