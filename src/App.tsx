import MainPage from "./сomponents/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import Login from "./сomponents/UserLogin/Login";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";
import { ToastContainer } from "react-toastify";
import ContactUs from "./сomponents/ContactUs/ContactUs";
import PostsCreationAdmin from "./сomponents/AdminPage/PostsAdmin/PostsCreationAdmin";
import ContactUsAdmin from "./сomponents/AdminPage/contactUsAdmin/ContactUsAdmin";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/contactusadm" element={<ContactUsAdmin />} />
        <Route path="/postsadm" element={<PostsCreationAdmin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
