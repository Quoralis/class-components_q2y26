import { Component } from "react";
import CharacterCard from "./CharacterCard/CharacterCard";
import type { Character } from "../../types/characters";
import styles from "./cardList.module.css";

interface CardListProps {
  characters: Character[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { characters } = this.props;

    return (
      <section className={styles.results__container}>
        {characters.length > 0 &&
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </section>
    );
  }
}

export default CardList;
