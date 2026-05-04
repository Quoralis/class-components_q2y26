import { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import CardList from './components/CardList/CardList';
import type { ApiResponse } from './types/characters';
import type { AppState } from './types/search';

class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
    lastSearch: '',
  };

  fetchData = (name = '') => {
    const clearedName = name.trim();
    const url = new URL('https://rickandmortyapi.com/api/character');
    url.searchParams.set('name', clearedName);
    if(this.state.lastSearch === clearedName) return Promise.resolve();
    return fetch(url.toString())
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        this.setState({ characters: data.results || [],
        lastSearch: clearedName});
      })
      .catch((err) => {
        console.log('Fetch error:', err);
        this.setState({ characters: [], lastSearch: clearedName });
      });
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') ?? '';
    this.fetchData(savedSearchTerm).catch((err) =>
      console.log('Error fetch', err),
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
