import { type ChangeEvent, Component } from "react";
import styles from "./searchBar.module.css";
import type { HeaderProps } from "../../types/search";

class SearchBar extends Component<HeaderProps> {
  state = {
    searchTerm: localStorage.getItem("searchTerm") ?? "",
  };

  handleSearch = () => {
    const currentSearchTerm = this.state.searchTerm.trim();
    const lastSearchTerm = localStorage.getItem("searchTerm") ?? "";
    if (currentSearchTerm === lastSearchTerm)
      return console.log("Search term is the same as last search term");
    localStorage.setItem("searchTerm", currentSearchTerm);

    this.props.onSearch(currentSearchTerm).catch((err) => {
      console.log("Error fetch", err);
    });
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleClear = () => {
    this.setState({ searchTerm: "" });
    localStorage.setItem("searchTerm",'');
    this.props.onSearch('').catch((err) => {
      console.log("Error fetch", err);
    });
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
          <button className={styles.clearButton} onClick={this.handleClear}>
            x
          </button>
        </div>

        <button onClick={this.handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
