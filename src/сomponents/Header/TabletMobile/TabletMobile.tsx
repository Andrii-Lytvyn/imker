import { NavLink } from "react-router-dom";
import styles from "./TabletMobile.module.css";
import { useRef } from "react";

const TabletMobile = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const closeMenu = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };
  return (
    <div>
      <nav className={`${styles.navbar} ${styles.fixed_top} ${styles.navbar}`}>
        <div className={styles.container_fluid}>
          <input
            ref={checkboxRef}
            className={`${styles.checkbox}`}
            type="checkbox"
            id="nav-toggle"
          />
          <label htmlFor="nav-toggle" className={styles.button}>
            <span className={styles.icon}></span>
          </label>
          <div className={styles.background}></div>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink
                  to="/posts"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Blog
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to="/events"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Veranstaltungen
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to="/contactUs"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Kontaktieren Sie uns
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to="/aboutUs"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Mitglieder der Gemeinschaft
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to="/gallery"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Galerie
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
      <section></section>
    </div>
  );
};

export default TabletMobile;
