import { type ChangeEvent, Component } from 'react';
import styles from './searchBar.module.css';

class SearchBar extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
  };

  handleSearch = () => {
    localStorage.setItem('searchTerm', this.state.searchTerm);
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
    console.log(this.state.searchTerm);
  };

  handleClear = () => {
    this.setState({ searchTerm: '' });
    localStorage.removeItem('searchTerm');
  };


  render() {
    return (
      <div className={styles.searchWrapper}>
        <div className={styles.inputContainer}>
          <input
            onChange={this.handleInputChange}
            type="text"
            className={styles.searchInput}
            placeholder="Search characters..."
            value={this.state.searchTerm}
          />
          <button className={styles.clearButton} onClick={this.handleClear}>x</button>
        </div>

        <button onClick={this.handleSearch} className={styles.searchButton}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
