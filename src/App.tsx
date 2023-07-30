import MainPage from "./сomponents/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./сomponents/UserLogin/Login";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";
import ContactUs from "./сomponents/ContactUs/ContactUs";
import ContactUsAdmin from "./сomponents/AdminPage/contactUsAdmin/ContactUsAdmin";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/*" element={<NoPage />} />

      <Route path="/contactusadm" element={<ContactUsAdmin />} />

    </Routes>
  );
}

export default App;
