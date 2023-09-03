import { NavLink } from "react-router-dom";
import styles from "./TabletMobile.module.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
const burgerRoot = document.getElementById("burger-menu-root");

const TabletMobile = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
      setIsMenuOpen((prev) => !prev);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);
  return createPortal(
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
      {/* <section></section> */}
    </div>,
    burgerRoot as HTMLElement
  );
};

export default TabletMobile;
