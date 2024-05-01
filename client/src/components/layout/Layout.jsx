import Breadcrumb from "./Breadcrumb";
import Header from "./header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Header />
        {/* Breadcrumb */}
        <Breadcrumb />
        {/* Breadcrumb */}

        <Outlet />

        {/* Footer */}
        <Footer />

        {/* /Footer */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Layout;
