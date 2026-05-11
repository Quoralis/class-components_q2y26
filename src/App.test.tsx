import { screen, render, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import App from "./App";

const mockCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "test.jpg",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "test2.jpg",
    episode: [],
    url: "",
    created: "",
  },
];

const mockApiResponse = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: mockCharacters,
};

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("shows loader on initial render", () => {
    render(<App />);
    expect(screen.getByText("Loading characters...")).toBeInTheDocument();
  });

  test("fetches and renders characters on mount", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });
  });

  test("calls fetch with saved localStorage term on mount", async () => {
    localStorage.setItem("searchTerm", "Rick");
    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("name=Rick")
      );
    });
  });

  test("calls fetch with empty string when localStorage is empty", async () => {
    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("name=")
      );
    });
  });

  test("saves search term to localStorage after fetch", async () => {
    localStorage.setItem("searchTerm", "Rick");
    render(<App />);

    await waitFor(() => {
      expect(localStorage.getItem("searchTerm")).toBe("Rick");
    });
  });

  test("shows error message on 404 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Not found characters")).toBeInTheDocument();
    });
  });

  test("shows error message on server error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong with the server")
      ).toBeInTheDocument();
    });
  });

  test("shows no characters message when results are empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ info: {}, results: [] }),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("No characters found")).toBeInTheDocument();
    });
  });

  test("does not repeat fetch when same search term is submitted", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });

    const searchButton = screen.getByRole("button", { name: "Search" });
    searchButton.click();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});