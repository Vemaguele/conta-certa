// src/utils/pdfGenerator.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoicePDF = async (element, fileName, empresa) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = imgWidth / imgHeight;
  const pdfImgWidth = pdfWidth - 20;
  const pdfImgHeight = pdfImgWidth / ratio;

  pdf.addImage(canvas, 'PNG', 10, 10, pdfImgWidth, pdfImgHeight);
  
  // Adicionar rodapé
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `Emitido por: ${empresa.nome || 'Sistema de Faturação'} • ${new Date().toLocaleDateString('pt-PT')}`,
    pdfWidth / 2,
    pdfHeight - 10,
    { align: 'center' }
  );

  pdf.save(fileName);
  return pdf;
};