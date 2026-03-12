// import { useEffect } from "react";

// function usePageCSS(cssPath: string) {
//     useEffect(() => {
//         const link = document.createElement("link");
//         link.rel = "stylesheet";
//         link.href = cssPath;

//         document.head.appendChild(link);

//         return () => {
//             document.head.removeChild(link);
//         };
//     }, [cssPath]);
// }

// export default usePageCSS;


import { useEffect } from "react";

function usePageCSS(cssPath: string) {
  useEffect(() => {

    const id = "page-css-" + cssPath.replace(/\//g,"-");

    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = import.meta.env.BASE_URL + cssPath;
    link.id = id;

    document.head.appendChild(link);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };

  }, [cssPath]);
}

export default usePageCSS;