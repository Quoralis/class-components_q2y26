import { Component } from "react";
import styles from "./Loader.module.css";

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader__container}>
        <div className={styles.spinner}></div>
        <p>Loading characters...</p>
      </div>
    );
  }
}

export default Loader;
