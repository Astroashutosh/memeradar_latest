import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const usePdfDownload = () => {
  const downloadPdf = async (
    element: HTMLElement,
    fileName: string = "download.pdf"
  ) => {
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3, // 🔥 HD quality
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [842, 595]); // A4 exact

    pdf.addImage(imgData, "PNG", 0, 0, 842, 595);

    pdf.save(fileName);
  };

  return { downloadPdf };
};