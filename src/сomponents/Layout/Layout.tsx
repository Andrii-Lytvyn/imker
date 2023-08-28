import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Suspense } from "react";
import LoaderStart from "../Loader/LoaderStart";

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoaderStart />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export { Layout };
