import styles from "./MainPage.module.css";
import Slider from "../Slider/Slider";

export default function MainPage(): JSX.Element {
  return (
    <>
      <Slider />
      <div className={styles.main}>
        <h1>Das ist MAIN PAGE</h1>
      </div>
    </>
  );
}
