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
import TostContainer from "./сomponents/TostContainer/TostContainer";
import Events from "./сomponents/Events/Events";
import Event from "./сomponents/Events/Event/Event";
import { Layout } from "./сomponents/Layout/Layout";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="posts" element={<NoPage />} />
          <Route path="posts/{post-id}" element={<MainPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="login" element={<Login />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="contactusadm" element={<ContactUsAdmin />} />
          <Route path="post" element={<PostSingle />} />
          <Route path="postsadd" element={<PostsCreationAdmin />} />
          <Route path="postsedit" element={<PostsListAdmin />} />
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
