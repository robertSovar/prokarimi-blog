import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import Button from "../../utils/Button/Button";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/userApi";
import { useAuth } from "../../utils/AuthContext/AuthContext";
import { Hourglass } from "react-loader-spinner";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const data = await registerUser(formData);
      console.log(data);
      localStorage.setItem("Username", JSON.stringify(data.data.username));
      localStorage.setItem("Role", JSON.stringify(data.data.role));

      login(data.username, data.role);
      setSuccess(true);
      if (data.data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.labelFormContainer}>
        {isLoading && <Hourglass visible={true} height="80" width="80" />}
        <h1 className={styles.labelFormTitle}>Register</h1>
        <label htmlFor="register" className={styles.labelForm}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autcocomplete="off"
          />
          <label htmlFor="role" className={styles.roleForm}>
            <input
              type="radio"
              name="role"
              id="user"
              value="User"
              onChange={handleChange}
            />{" "}
            User
            <input
              type="radio"
              name="role"
              id="admin  "
              value="Admin"
              onChange={handleChange}
            />{" "}
            Admin
          </label>
        </label>
        <Button
          label="Register"
          type="submit"
          className={styles.registerButton}
        />
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Registration successful!</p>}
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
