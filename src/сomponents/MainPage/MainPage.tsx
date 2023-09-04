// import styles from "./MainPage.module.css";
// import Slider from "../Slider/Slider";
import TypeOfHoney from "../TypeOfHoney/TypeOfHoney";
import OurMission from "../OurMission/OurMission";
// import TopCallery from "../Gallery/TopCallery/TopCallery";
// import Gallery from "../Gallery/Gallery";
// import AboutUs from "../AboutUs/AboutUs";
import Team from "../Team/Team";
import GallerySwiper3 from "../GallerySwiper/GallerySwiper3";

export default function MainPage(): JSX.Element {
  return (
    <>
      <GallerySwiper3 />
      {/* <Slider /> */}
      <OurMission />
      <TypeOfHoney />
      <Team />
    </>
  );
}
