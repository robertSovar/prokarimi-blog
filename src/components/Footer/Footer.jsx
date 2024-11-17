import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <section className={styles.footerSection}>
      <div>@2024 All rights reserved</div>
      <div>
        created by{" "}
        <a
          href="https://github.com/robertsovar"
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          Robert Sovar
        </a>
      </div>
    </section>
  );
}

export default Footer;
