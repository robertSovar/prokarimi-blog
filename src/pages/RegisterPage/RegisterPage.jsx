import React from "react";
import styles from "./RegisterPage.module.css";
import Button from "../../utils/Button/Button";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className={styles.container}>
      <form action="register" className={styles.labelFormContainer}>
        <h1 className={styles.labelFormTitle}>Register</h1>
        <label htmlFor="register" className={styles.labelForm}>
          <input name="email" id="email" type="text" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <Button
          label="Register"
          type="submit"
          className={styles.registerButton}
        />
      </form>
      <p>
        Already have an account?{" "}
        <Link to={"/login"} className="link">
          <span className={styles.registerLink}>Log in</span>
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
