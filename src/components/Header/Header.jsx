import Hamburger from "hamburger-react";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.headerSection}>
      <div className={styles.headerContainer}>
        <div className={styles.mobileBurgerContainer}>
          <span className={styles.headerLogo}>
            Prokarimi <span className={styles.blogWordStyle}>Blog</span>
          </span>
          <span className={styles.mobileBurger}>
            <Hamburger size={20} color="rgba(221, 90, 14, 0.67)" />
          </span>
        </div>

        <ul className={styles.headerList}>
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
