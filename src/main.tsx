// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { Buffer } from 'buffer';
// // import { BASE_URL } from "./config";
// import "./assets/vendor/bootstrap/css/bootstrap.min.css";
// import "./assets/vendor/swiper/swiper-bundle.min.css";
// import "./assets/css/font-awesome.css";
// import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
// import "./assets/vendor/menu/dropdown-effects/fade-down.css";
// import "./assets/vendor/menu/webslidemenu.css";
// import "./assets/vendor/dataTables.bootstrap5.min.css";



// // CSS with BASE_URL
// // import `${BASE_URL}assets/vendor/bootstrap/css/bootstrap.min.css`;
// // import `${BASE_URL}assets/vendor/swiper/swiper-bundle.min.css`;
// // import `${BASE_URL}assets/css/font-awesome.css`;
// // import `${BASE_URL}assets/vendor/bootstrap-icons/bootstrap-icons.css`;
// // import `${BASE_URL}assets/vendor/menu/dropdown-effects/fade-down.css`;
// // import `${BASE_URL}assets/vendor/menu/webslidemenu.css`;
// // import `${BASE_URL}assets/vendor/dataTables.bootstrap5.min.css`;
// import App from "./App.tsx";



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


// (window as any).Buffer = Buffer;
// createRoot(document.getElementById('root')!).render(
//   // basename="/memeradar/"
//   <BrowserRouter basename={import.meta.env.BASE_URL}>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </BrowserRouter>
// );















import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/font-awesome.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/menu/dropdown-effects/fade-down.css";
import "./assets/vendor/menu/webslidemenu.css";
import "./assets/vendor/dataTables.bootstrap5.min.css";

import App from "./App.tsx";

const BASE = import.meta.env.BASE_URL;

// fix image/audio path
function fixAssets() {
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && src.startsWith("/img")) {
      img.setAttribute("src", BASE + src.substring(1));
    }
  });

  document.querySelectorAll("audio").forEach((audio) => {
    const src = audio.getAttribute("src");
    if (src && src.startsWith("/audio")) {
      audio.setAttribute("src", BASE + src.substring(1));
    }
  });
}

// run after page load
window.addEventListener("load", fixAssets);

// observe DOM changes (React render later)
const observer = new MutationObserver(() => {
  fixAssets();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
(window as any).Buffer = Buffer;
createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);