// import { toast } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Layout } from "./сomponents/Layout/Layout";
import { useAppDispatch } from "./hooks/dispatch.selector";

// import { userDataInfo } from "./redux/userStore/userSlice";

import { userDataInfo, userIsLogin } from "./redux/userStore/userSlice";
import {
  getLoginStatus,
  getUserData,
} from "./сomponents/UserLogin/helpers/userAuth/userOperation";
import { useUserSelector } from "./redux/userStore/userSelector";
import { navStatus } from "./redux/navigatinOnPage/navigatinOnPageSlice";

const AdminPage = lazy(() => import("./сomponents/AdminPage/AdminPage"));
const MainPage = lazy(() => import("./сomponents/MainPage/MainPage"));
const AboutUs = lazy(() => import("./сomponents/AboutUs/AboutUs"));
const NoPage = lazy(() => import("./сomponents/NoPage/NoPage"));
const ContactUs = lazy(() => import("./сomponents/ContactUs/ContactUs"));
const TostContainer = lazy(
  () => import("./сomponents/TostContainer/TostContainer")
);
const Events = lazy(() => import("./сomponents/Events/Events"));
const Event = lazy(() => import("./сomponents/Events/Event/Event"));
const Posts = lazy(() => import("./сomponents/Posts/Posts"));
const Gallery = lazy(() => import("./сomponents/Gallery/Gallery"));
const PostSingle = lazy(
  () => import("./сomponents/Posts/PostSingle/PostSingle")
);
const AccountPage = lazy(() => import("./сomponents/AccountPage/AccountPage"));
const RegisterUser = lazy(
  () => import("./сomponents/UserLogin/RegisterUser/RegisterUser")
);
const SingInUser = lazy(
  () => import("./сomponents/UserLogin/SingInUser/SingUser")
);
const SecretAnswer = lazy(
  () => import("./сomponents/UserLogin/SingInUser/SecretAnswer/SecretAnswer")
);
const RestoreAnswer = lazy(
  () => import("./сomponents/UserLogin/SingInUser/RestoreAnswer/RestoreAnswer")
);
const RestorePassword = lazy(
  () =>
    import("./сomponents/UserLogin/SingInUser/RestorePassword/RestorePassword")
);

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useUserSelector();

  useEffect(() => {
    const isUserLoggedIn = getLoginStatus();
    if (isUserLoggedIn) {
      const refreshUser = async () => {
        try {
          const userInfo = await getUserData();
          dispatch(userDataInfo(userInfo?.data));
          dispatch(userIsLogin(true));
          dispatch(navStatus(pathname.replace(/(\/[^/]+)(\/.*)/, "$1")));
        } catch (error) {
          dispatch(userIsLogin(false));
          console.log("🚀  error:", error);
        }
      };
      refreshUser();
    } else {
      // toast.info("Привет сладенький !!!");
    }
  }, [dispatch, pathname, user.id]);

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
          <Route path="gallery" element={<Gallery />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/singUp" element={<SingInUser />} />
          <Route path="*" element={<NoPage />} />

          <Route path="accountpage" element={<AccountPage />} />
          <Route path="adminpage" element={<AdminPage />} />
          <Route path="/restore" element={<SecretAnswer />} />
          <Route path="/restoreAnswer" element={<RestoreAnswer />} />
          <Route path="/restorePassword" element={<RestorePassword />} />
        </Route>
      </Routes>
      <TostContainer />
    </>
  );
}

export default App;
