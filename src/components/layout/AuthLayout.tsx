
import { Outlet } from "react-router-dom";
import usePageCSS from "../../hooks/usePageCSS";
import Common from "./Common";


function AuthLayout() {
  usePageCSS("assets/style.css");

  return (
    <>
    <Common/>
      <Outlet />
    </>
  );
}

export default AuthLayout;