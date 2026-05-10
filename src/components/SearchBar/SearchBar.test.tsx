import { screen, fireEvent, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const mockOnSearch = vi.fn().mockResolvedValue(null);

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test(" check render input and button", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Search" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Rick" } });

    expect(input).toHaveValue("Rick");
  });

  test("initializes with value from localStorage", () => {
    localStorage.setItem("searchTerm", "Morty");
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Morty");
  });

  test("clear input and localStorage on clear button click", () => {
    localStorage.setItem("searchTerm", "Rick");
    render(<SearchBar onSearch={mockOnSearch} />);

    const clearButton = screen.getByRole("button", { name: "x" });
    fireEvent.click(clearButton);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(localStorage.getItem("searchTerm")).toBe("");
  });
});
