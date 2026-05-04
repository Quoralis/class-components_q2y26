import { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import CardList from './components/CardList/CardList';
import type { ApiResponse } from './types/characters';
import type { AppState } from './types/search';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

class App extends Component<object, AppState> {
  state: AppState = {
    characters: [],
    lastSearch: null,
    isLoading: true,
    error: null,
  };

  fetchData = (name = '') => {
    const clearedName = name.trim();
    const url = new URL('https://rickandmortyapi.com/api/character');
    url.searchParams.set('name', clearedName);
    if (this.state.lastSearch === clearedName) return Promise.resolve();
    this.setState({ isLoading: true, error: null });

    return fetch(url.toString())
      .then((res) => {
        if(res.ok) return  res.json();
        throw new Error(res.status === 404 ? 'Not found characters' : 'Something went wrong with the server');

      })
      .then((data: ApiResponse) => {
        this.setState({
          characters: data.results || [],
          lastSearch: clearedName,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          characters: [],
          lastSearch: clearedName,
          isLoading: false,
          error: (err as Error).message
        });
      });
  };

  renderContent = () => {
    const { characters, isLoading, error } = this.state;
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (characters.length === 0) return <p>No characters found</p>;
    return <CardList characters={characters} />;
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') ?? '';
    this.fetchData(savedSearchTerm).catch(() => null);
  }

  render() {
    return (
      <div className={styles.app__container}>
        <Header onSearch={this.fetchData} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
