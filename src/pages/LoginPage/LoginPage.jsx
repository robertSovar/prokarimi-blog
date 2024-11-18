import React from "react";
import styles from "./LoginPage.module.css";
import Button from "../../utils/Button/Button.jsx";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className={styles.container}>
      <form action="login" className={styles.labelFormContainer}>
        <h1 className={styles.labelFormTitle}>Log in</h1>
        <label htmlFor="login" className={styles.labelForm}>
          <input name="email" id="email" type="text" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <Button label="Log in" type="submit" className={styles.loginButton} />
      </form>
      <p>
        Don't have an account?{" "}
        <Link to={"/register"} className="link">
          <span className={styles.registerLink}>Register here</span>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
