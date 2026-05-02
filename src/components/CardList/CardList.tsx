import { Component } from "react";
import CharacterCard from "./CharacterCard/CharacterCard";
import type { Character } from "../../types/characters";

interface CardListProps {
  characters: Character[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { characters } = this.props;

    return (
      <section>
        {characters.length > 0 &&
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}

        {characters.length === 0 && <p>No results found</p>}
      </section>
    );
  }
}

export default CardList;
