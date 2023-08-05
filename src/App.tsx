import { Route, Routes } from "react-router-dom";
import { Layout } from "./сomponents/Layout/Layout";
import MainPage from "./сomponents/MainPage/MainPage";
import AboutUs from "./сomponents/AboutUs/AboutUs";
import NoPage from "./сomponents/NoPage/NoPage";
import ContactUs from "./сomponents/ContactUs/ContactUs";
import ContactUsAdmin from "./сomponents/AdminPage/contactUsAdmin/ContactUsAdmin";
import TostContainer from "./сomponents/TostContainer/TostContainer";
import Events from "./сomponents/Events/Events";
import Event from "./сomponents/Events/Event/Event";
import Login from "./сomponents/UserLogin/Login";
import Posts from "./сomponents/Posts/Posts";
import PostsAdmin from "./сomponents/AdminPage/PostsAdmin/PostsAdmin";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="posts/{post-id}" element={<MainPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="login" element={<Login />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="contactusadm" element={<ContactUsAdmin />} />
          <Route path="posts" element={<Posts />} />
          <Route path="postsadm" element={<PostsAdmin />} />
          <Route path="about" element={<AboutUs />} />
          {/* <Route path="gallery" element={<Gallery />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <TostContainer />
    </>
  );
}

export default App;
