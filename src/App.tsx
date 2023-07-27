import MainPage from "./сomponents/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./сomponents/UserLogin/Login";
import Contacts from "./сomponents/Сontacts/Contacts";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
