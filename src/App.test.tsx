import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const subtitleElement = screen.getByText(
    /A subtitle player for the browser/i
  );
  expect(subtitleElement).toBeInTheDocument();
});
