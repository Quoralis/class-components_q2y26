import { Component } from 'react';
import styles from './searchBar.module.css';

class SearchBar extends Component {
  render() {
    return (
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search characters..."
        />
        <button
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;