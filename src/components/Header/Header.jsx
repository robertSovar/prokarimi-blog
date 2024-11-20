import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext/AuthContext";
import Hamburger from "hamburger-react";
import styles from "./Header.module.css";
import Button from "../../utils/Button/Button";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const username = JSON.parse(localStorage.getItem("Username"));
  const role = JSON.parse(localStorage.getItem("Role"));
  const navigate = useNavigate();

  return (
    <header className={styles.headerSection}>
      <div className={styles.headerContainer}>
        <div className={styles.mobileBurgerContainer}>
          <Link className="link" to={"/"}>
            <span className={styles.headerLogo}>
              Prokarimi <span className={styles.blogWordStyle}>Blog</span>
            </span>
          </Link>

          <span className={styles.mobileBurger}>
            <Hamburger size={20} color="rgba(221, 90, 14, 0.67)" />
          </span>
        </div>

        <ul className={styles.headerList}>
          {user.isAuthenticated ? (
            <>
              <li>
                <span className={styles.headerWelcome}>
                  Welcome {username} with role:{role}
                </span>
              </li>
              <li>
                <Button
                  label="Logout"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "active" : "navLink"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
