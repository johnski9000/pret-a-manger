import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders homepage", () => {
    render(<Home />);
    expect(screen.getByText(/Home page/i)).toBeInTheDocument();
  });

  it("has a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
