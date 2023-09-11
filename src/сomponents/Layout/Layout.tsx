import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Suspense } from "react";
import LoaderStart from "../Loader/LoaderStart";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "60vh" }}>
        <Suspense fallback={<LoaderStart />}>
          <Outlet />
        </Suspense>
        <ButtonScrollUp />
      </div>
      <Footer />
    </>
  );
};

export { Layout };
