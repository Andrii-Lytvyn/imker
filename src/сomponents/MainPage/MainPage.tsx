import styles from "./MainPage.module.css";
import Slider from "../Slider/Slider";
import TypeOfHoney from "../TypeOfHoney/TypeOfHoney";

export default function MainPage(): JSX.Element {
  return (
    <>
      <Slider />
      <div className={styles.main}>
        <TypeOfHoney />
      </div>
    </>
  );
}
