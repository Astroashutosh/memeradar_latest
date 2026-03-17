// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from 'buffer';
// import { BASE_URL } from "./config";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/font-awesome.css";
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import "./assets/vendor/menu/dropdown-effects/fade-down.css";
import "./assets/vendor/menu/webslidemenu.css";
import "./assets/vendor/dataTables.bootstrap5.min.css";

import App from "./App.tsx";



// const BASE = import.meta.env.BASE_URL;

// const fixAssets = () => {
//   document.querySelectorAll("img").forEach((img) => {
//     const src = img.getAttribute("src");
//     if (src && src.startsWith("/img")) {
//       img.src = BASE + src.replace("/", "");
//     }
//   });

//   document.querySelectorAll("audio").forEach((audio) => {
//     const src = audio.getAttribute("src");
//     if (src && src.startsWith("/audio")) {
//       audio.src = BASE + src.replace("/", "");
//     }
//   });
// };

// setTimeout(fixAssets, 0);


(window as any).Buffer = Buffer;
createRoot(document.getElementById('root')!).render(
  // basename="/bullbnb-solana-design/"
  // basename={import.meta.env.BASE_URL}
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </BrowserRouter>
);








