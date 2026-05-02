import { Component } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import CardList from "./components/CardList/CardList";
import type { ApiResponse } from "./types/characters";
import type { AppState } from "./types/search";

class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
  };

  fetchData = (name = "") => {
    const url = new URL("https://rickandmortyapi.com/api/character");
    url.searchParams.set("name", name.trim());

    return fetch(url.toString())
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        this.setState({ characters: data.results || [] });
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        this.setState({ characters: [] });
      });
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm") ?? "";
    this.fetchData(savedSearchTerm).catch((err) =>
      console.log("Error fetch", err),
    );
  }

  render() {
    return (
      <div className={styles.app__container}>
        <Header onSearch={this.fetchData} />

        <CardList characters={this.state.characters} />
      </div>
    );
  }
}

export default App;
