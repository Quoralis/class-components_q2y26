import { Component } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorProps {
  message: string;
}

class ErrorMessage extends Component<ErrorProps> {
  render() {
    return (
      <div className={styles.error__container}>
        <div className={styles.error__icon}>⚠️</div>
        <p className={styles.error__text}>{this.props.message}</p>
      </div>
    );
  }
}

export default ErrorMessage;
