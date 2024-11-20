import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Button from "../../utils/Button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import { Hourglass } from "react-loader-spinner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await loginUser({ email, password });
      console.log(response);
      const token = response.data;
      localStorage.setItem("token", token);

      if (!response) {
        throw new Error("Login failed");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form
        action="login"
        onSubmit={loginSubmit}
        className={styles.labelFormContainer}
      >
        {isLoading && <Hourglass visible={true} height="80" width="80" />}
        <h1 className={styles.labelFormTitle}>Log in</h1>
        <label htmlFor="login" className={styles.labelForm}>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
