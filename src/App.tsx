import { Component } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import CardList from "./components/CardList/CardList";
import type { ApiResponse } from "./types/characters";
import type { AppState } from "./types/search";
import Loader from './components/Loader/Loader';

class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
    lastSearch: null,
    isLoading: true
  };

  fetchData = (name = "") => {
    const clearedName = name.trim();
    const url = new URL("https://rickandmortyapi.com/api/character");
    url.searchParams.set("name", clearedName);
    if (this.state.lastSearch === clearedName) return Promise.resolve();
    return fetch(url.toString())
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        this.setState({
          characters: data.results || [],
          lastSearch: clearedName,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        this.setState({ characters: [], lastSearch: clearedName, isLoading: false });
      });
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm") ?? "";
    this.fetchData(savedSearchTerm).catch((err) =>
      console.log("Error fetch", err),
    );
  }

  render() {
    const { isLoading, characters } = this.state;
    return (
      <div className={styles.app__container}>
        <Header onSearch={this.fetchData} />

        {isLoading ? <Loader/> : <CardList characters={characters} />}
      </div>
    );
  }
}

export default App;
