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
import Gallery from "./сomponents/Gallery/Gallery";
import AddEventAdmin from "./сomponents/AdminPage/EventsAdmin/AddEventAdmin";
import EditEventAdmin from "./сomponents/AdminPage/EventsAdmin/EditEventAdmin";
import EditAllEvents from "./сomponents/AdminPage/EventsAdmin/EditAllEvents";
import PostSingle from "./сomponents/Posts/PostSingle/PostSingle";
import TeamEditAdmin from "./сomponents/AdminPage/AboutUsAdmin/TeamEditAdmin";
import TeamAddMemberAdmin from "./сomponents/AdminPage/AboutUsAdmin/TeamAddNewMember";
import TeamAdmin from "./сomponents/AdminPage/AboutUsAdmin/TeamAdmin";
import FilesUploadAdmin from "./сomponents/AdminPage/FilesUploadAdmin/FilesUploadAdmin";
import AccountPage from "./сomponents/AccountPage/AccountPage";
import GalleryAdmin from "./сomponents/AdminPage/GalleryAdmin/GalleryAdmin";

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
          <Route path="aboutusadmin" element={<TeamAdmin />} />
          <Route
            path="aboutusadmin/addmember"
            element={<TeamAddMemberAdmin />}
          />
          <Route
            path="aboutusadmin/teameditadmin"
            element={<TeamEditAdmin />}
          />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="contactusadm" element={<ContactUsAdmin />} />
          <Route path="posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostSingle />} />
          <Route path="postsadm" element={<PostsAdmin />} />
          <Route path="filesadm" element={<FilesUploadAdmin />} />
          <Route path="accountpage" element={<AccountPage />} />
          <Route path="galleryadm" element={<GalleryAdmin />} />
          <Route path="eventsadm" element={<AddEventAdmin />} />
          <Route path="eventsadm-edit/:editId" element={<EditEventAdmin />} />
          <Route path="eventsadm-edit" element={<EditAllEvents />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <TostContainer />
    </>
  );
}

export default App;
