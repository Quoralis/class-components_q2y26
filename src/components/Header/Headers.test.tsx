import { screen, render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Header from "./Header";

const mockOnSearch = vi.fn().mockResolvedValue(null);

describe("Header", () => {
  test("renders logo, title and nav", () => {
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("CHARACTER PORTAL")).toBeInTheDocument();
    expect(screen.getByText("All Characters")).toBeInTheDocument();
    expect(screen.getByText("Locations")).toBeInTheDocument();
    expect(screen.getByText("Episodes")).toBeInTheDocument();
  });

  test("renders SearchBar inside Header", () => {
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("renders Crash App button", () => {
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByRole("button", { name: "Crash App" })).toBeInTheDocument();
  });

  test("throws error when Crash App is clicked", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => null);

    render(<Header onSearch={mockOnSearch} />);

    expect(() => {
      fireEvent.click(screen.getByRole("button", { name: "Crash App" }));
    }).toThrow("Something went wrong");

    consoleError.mockRestore();
  });
});