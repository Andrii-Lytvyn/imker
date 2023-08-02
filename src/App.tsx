import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import MainPage from "./сomponents/MainPage/MainPage";
import Login from "./сomponents/UserLogin/Login";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";
import Contacts from "./сomponents/ContactUs/ContactUs";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<NoPage />} />
        <Route path="/posts/{post-id}" element={<MainPage />} />
        <Route path="/events" element={<NoPage />} />
        <Route path="/events/{event-id}" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactUs" element={<Contacts />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
