import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "./сomponents/Layout/Layout";

import AdminPage from "./сomponents/AdminPage/AdminPage";
const MainPage = lazy(() => import("./сomponents/MainPage/MainPage"));
const TeamEditMemberAdmin = lazy(
  () => import("./сomponents/AdminPage/AboutUsAdmin/TeamEditMemberAdmin")
);
const AboutUs = lazy(() => import("./сomponents/AboutUs/AboutUs"));
const NoPage = lazy(() => import("./сomponents/NoPage/NoPage"));
const ContactUs = lazy(() => import("./сomponents/ContactUs/ContactUs"));
const ContactUsAdmin = lazy(
  () => import("./сomponents/AdminPage/contactUsAdmin/ContactUsAdmin")
);
const TostContainer = lazy(
  () => import("./сomponents/TostContainer/TostContainer")
);
const Events = lazy(() => import("./сomponents/Events/Events"));
const Event = lazy(() => import("./сomponents/Events/Event/Event"));
const Posts = lazy(() => import("./сomponents/Posts/Posts"));
const PostsAdmin = lazy(
  () => import("./сomponents/AdminPage/PostsAdmin/PostsAdmin")
);
const Gallery = lazy(() => import("./сomponents/Gallery/Gallery"));
const GalleryAdmin = lazy(
  () => import("./сomponents/AdminPage/GalleryAdmin/GalleryAdmin")
);

const AddEventAdmin = lazy(
  () => import("./сomponents/AdminPage/EventsAdmin/AddEventAdmin")
);
const EditEventAdmin = lazy(
  () => import("./сomponents/AdminPage/EventsAdmin/EditEventAdmin")
);
const EditAllEvents = lazy(
  () => import("./сomponents/AdminPage/EventsAdmin/EditAllEvents")
);
const PostSingle = lazy(
  () => import("./сomponents/Posts/PostSingle/PostSingle")
);

const TeamAddMemberAdmin = lazy(
  () => import("./сomponents/AdminPage/AboutUsAdmin/TeamAddNewMember")
);
const TeamAdmin = lazy(
  () => import("./сomponents/AdminPage/AboutUsAdmin/TeamAdmin")
);
const FilesUploadAdmin = lazy(
  () => import("./сomponents/AdminPage/FilesUploadAdmin/FilesUploadAdmin")
);
const AccountPage = lazy(() => import("./сomponents/AccountPage/AccountPage"));

const RegisterUser = lazy(
  () => import("./сomponents/UserLogin/RegisterUser/RegisterUser")
);
const SingInUser = lazy(
  () => import("./сomponents/UserLogin/SingInUser/SingInUser")
);
const SecretAnswer = lazy(
  () => import("./сomponents/UserLogin/SingInUser/SecretAnswer/SecretAnswer")
);
const RestorePassword = lazy(
  () =>
    import("./сomponents/UserLogin/SingInUser/RestorePassword/RestorePassword")
);

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="posts/{post-id}" element={<MainPage />} />
          <Route path="posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostSingle />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/singUp" element={<SingInUser />} />
          <Route path="*" element={<NoPage />} />
          <Route path="adminpage" element={<AdminPage />} />

          <Route path="aboutusadmin" element={<TeamAdmin />} />
          <Route
            path="aboutusadmin/addmember"
            element={<TeamAddMemberAdmin />}
          />
          <Route
            path="aboutusadmin/teameditmemberadmin/:id"
            element={<TeamEditMemberAdmin />}
          />
          <Route path="contactusadm" element={<ContactUsAdmin />} />
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
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/singUp" element={<SingInUser />} />
          <Route path="/restore" element={<SecretAnswer />} />
          <Route path="/restorePassword" element={<RestorePassword />} />
        </Route>
      </Routes>
      <TostContainer />
    </>
  );
}

export default App;
