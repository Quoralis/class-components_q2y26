import { Component } from "react";
import styles from "./header.module.css";
import logoImg from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import type { HeaderProps } from "../../types/search";

class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">
            <img src={logoImg} alt="Logo" className={styles.logo__img} />
          </a>
        </div>

        <h1 className={styles.title}>CHARACTER PORTAL</h1>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem_active}>All Characters</li>
            <li className={styles.navItem}>Locations</li>
            <li className={styles.navItem}>Episodes</li>
          </ul>
        </nav>

        <div className={styles.searchRow}>
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </header>
    );
  }
}

export default Header;
