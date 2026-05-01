import { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';


class App extends Component {
  render() {
    return (
      <div className={styles.app__container}>
        <Header/>
      </div>
    );
  };
}

export default App;
