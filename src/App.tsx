import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import MainPage from "./сomponents/MainPage/MainPage";
import Login from "./сomponents/UserLogin/Login";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";
import ContactUs from "./сomponents/ContactUs/ContactUs";
import PostsCreationAdmin from "./сomponents/AdminPage/PostsAdmin/PostsCreationAdmin";
import ContactUsAdmin from "./сomponents/AdminPage/contactUsAdmin/ContactUsAdmin";
import PostSingle from "./сomponents/Posts/PostSingle/PostSingle";
import PostsListAdmin from "./сomponents/AdminPage/PostsAdmin/PostsListAdmin";
import { Layout } from "./сomponents/Layout/Layout";
import Gallery from "./сomponents/Gallery/Gallery";


function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage />} />
          <Route path="posts" element={<NoPage />} />
          <Route path="posts/{post-id}" element={<MainPage />} />
          <Route path="events" element={<NoPage />} />
          <Route path="events/{event-id}" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="contactusadm" element={<ContactUsAdmin />} />
          <Route path="post" element={<PostSingle />} />
          <Route path="postsadd" element={<PostsCreationAdmin />} />
          <Route path="postsedit" element={<PostsListAdmin />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NoPage />} />
        </Route>
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
