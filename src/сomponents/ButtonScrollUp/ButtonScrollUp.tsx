import { useState, useEffect } from "react";
import styles from "./ButtonScrollUp.module.css";
import { BsArrowUpCircle } from "react-icons/bs";

const ButtonScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 356) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${styles.scroll_to_top} ${isVisible ? styles.visible : ""}`}
    >
      <button onClick={scrollToTop}>
        <BsArrowUpCircle size={32} />
      </button>
    </div>
  );
};

export default ButtonScrollUp;
