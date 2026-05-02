import { Component } from "react";
import styles from "./characterCard.module.css";
import type { Character } from "../../../types/characters";

interface CharacterCardProps {
  character: Character;
}

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    const character = this.props.character;

    return (
      <div className={styles.card}>
        <div className={styles.img__container}>
          <img src={character.image} alt={character.name} />
          <div className={styles.name__bar}>
            <span>{character.name}</span>
          </div>
        </div>

        <div className={styles.info__section}>
          <div className={styles.info__row}>
            <span className={styles.label}>Status: </span>
            <span className={styles.value}>
              {character.status}
              <span
                className={`${styles.status__dot} ${styles[character.status.toLowerCase()]}`}
              ></span>
            </span>
            <button className={styles.inline__button}>View Profile</button>
          </div>

          <div className={styles.info__row}>
            <span className={styles.label}>Species: </span>
            <span className={styles.value}>{character.species}</span>
          </div>

          <div className={styles.info__row}>
            <span className={styles.label}>Origin: </span>
            <span className={styles.value}>{character.origin.name}</span>
          </div>

          <div className={styles.info__row}>
            <span className={styles.label}>Last Seen: </span>
            <span className={styles.value}>{character.location.name}</span>
          </div>

          <button className={styles.footer__button}>View Profile</button>
        </div>
      </div>
    );
  }
}

export default CharacterCard;
