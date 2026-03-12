

import { Outlet } from "react-router-dom";
import usePageCSS from "../../hooks/usePageCSS";
import Footer from "./user/Footer";
import Header from "./smartContract/Header";
// import bgImg from "/img/bg.webp";

function MainLayout() {
  // usePageCSS("/assets/home.css");
  usePageCSS("assets/dex.css");
  usePageCSS("assets/smartContract.css");


  return (
    <>
      {/* <img className="bg-shade" src={bgImg} alt=""/> */}

      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;