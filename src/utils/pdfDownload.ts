import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadElementAsPdf = async (
  element: HTMLElement,
  fileName = "download.pdf"
) => {
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("landscape", "px", [842, 595]);

  pdf.addImage(imgData, "PNG", 0, 0, 842, 595);

  pdf.save(fileName);
};