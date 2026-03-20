import { useEffect, useRef } from "react";
import usePageCSS from "../../hooks/usePageCSS";
import { downloadElementAsPdf } from "../../utils/pdfDownload";

function EarningCertificate() {
  usePageCSS("assets/earningCertificate.css");

  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (certRef.current) {
        downloadElementAsPdf(certRef.current, "earning-certificate.pdf");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div ref={certRef} className="rank-certificate-wrapper">
        <img
          src={`${import.meta.env.BASE_URL}img/certificate/certificate-earning-bg.jpg`}
          width="100%"
        />

        <div className="rank-name">James Charlie</div>

        <div className="rank-achieved-text">Director</div>

        <div className="earning-text">0.2562 SOL</div>

        <div className="rank-achieved-date">
          Date: 03-03-2026
        </div>
      </div>
    </>
  );
}

export default EarningCertificate;