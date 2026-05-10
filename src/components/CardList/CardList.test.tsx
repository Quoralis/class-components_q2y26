import { screen, render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import CardList from "./CardList";
import type { Character } from "../../types/characters";

const mockCharacter: Character = {
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
};

const mockCharacters: Character[] = [
  mockCharacter,
  { ...mockCharacter, id: 2, name: "Morty Smith" },
];

describe("CardList", () => {
  test("renders list of characters", () => {
    render(<CardList characters={mockCharacters} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  test("renders correct number of cards", () => {
    render(<CardList characters={mockCharacters} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  test("renders nothing when empty array passed", () => {
    const { container } = render(<CardList characters={[]} />);

    const section = container.querySelector("section");
    expect(section).toBeEmptyDOMElement();
  });

  test("renders single character", () => {
    render(<CardList characters={[mockCharacter]} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });
});