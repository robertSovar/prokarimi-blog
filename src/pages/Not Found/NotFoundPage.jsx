import React from "react";
import styles from "./NotFoundPage.module.css";
import Button from "../../utils/Button/Button";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>Page not found </h1>
      <Button
        label="Go back"
        type="submit"
        className={styles.registerButton}
        onClick={() => window.history.back()}
      />
    </div>
  );
}

export default NotFoundPage;
