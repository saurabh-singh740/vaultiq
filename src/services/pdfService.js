const PDFDocument = require('pdfkit');
const { WritableStreamBuffer } = require('stream-buffers');

exports.generatePromptsPDF = (prompts) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const bufferStream = new WritableStreamBuffer();

      doc.pipe(bufferStream);

      doc.fontSize(20).text('VaultIQ Prompts Export', { align: 'center' });
      doc.moveDown();

      prompts.forEach((prompt, index) => {
        doc.fontSize(12).text(`${index + 1}. ${prompt.text}`);
        doc.moveDown();
      });

      doc.end();

      bufferStream.on('finish', () => {
        const pdfBuffer = bufferStream.getContents();
        resolve(pdfBuffer);
      });
    } catch (err) {
      reject(err);
    }
  });
};
