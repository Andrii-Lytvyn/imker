// import styles from "./MainPage.module.css";
import Slider from "../Slider/Slider";
import TypeOfHoney from "../TypeOfHoney/TypeOfHoney";
import OurMission from "../OurMission/OurMission";
// import TopCallery from "../Gallery/TopCallery/TopCallery";
// import Gallery from "../Gallery/Gallery";
import AboutUs from "../AboutUs/AboutUs";
import Team from "../Team/Team";

export default function MainPage(): JSX.Element {
  return (
    <>
      <Slider />
      <OurMission />
      <TypeOfHoney />
      <Team />
    </>
  );
}
