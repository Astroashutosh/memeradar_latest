import { useEffect, useRef } from "react";
import usePageCSS from "../../hooks/usePageCSS";
import { downloadElementAsPdf } from "../../utils/pdfDownload";

function CertificateDownload() {
  usePageCSS("assets/certificate.css");

  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (certRef.current) {
        downloadElementAsPdf(certRef.current, "certificate.pdf");
      }
    }, 500); // ⏱️ wait for render

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div ref={certRef} className="rank-certificate-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}img/certificate/rank-certificate-bg.png`}
          width="100%"
        />

        <div className="rank-name">James Charlie</div>

        <div className="rank-achieved-text">Director</div>

        <div className="rank-achieved-date">10-03-2026</div>
      </div>
    </>
  );
}

export default CertificateDownload;



// import { useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import usePageCSS from "../../hooks/usePageCSS";

// function CertificateDownload() {
//   usePageCSS("assets/certificate.css");

//   const certRef = useRef<HTMLDivElement>(null);

//   const handleDownload = async () => {
//     if (!certRef.current) return;

//     const canvas = await html2canvas(certRef.current, {
//       scale: 2, // 🔥 better quality
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("landscape", "px", "a4");

//     const imgWidth = pdf.internal.pageSize.getWidth();
//     const imgHeight = canvas.height * imgWidth / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//     pdf.save("certificate.pdf");
//   };

//   // 🔥 auto download on page load
//   useEffect(() => {
//     setTimeout(() => {
//       handleDownload();
//     }, 500);
//   }, []);

//   return (
//     <>
//       <div ref={certRef} className="rank-certificate-wrapper">
//         <img
//           src={`${import.meta.env.BASE_URL}img/certificate/rank-certificate-bg.png`}
//           width="100%"
//         />

//         <div className="rank-name">James Charlie</div>
//         <div className="rank-achieved-text">Director</div>
//         <div className="rank-achieved-date">10-03-2026</div>
//       </div>
//     </>
//   );
// }

// export default CertificateDownload;