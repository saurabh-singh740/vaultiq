const PDFDocument = require('pdfkit');

exports.generatePromptsPDF = async (prompts) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.fontSize(20).text('PromptVault Export', { align: 'center' });
      doc.moveDown();

      prompts.forEach((prompt, index) => {
        doc.fontSize(14).text(`${index + 1}. ${prompt.title || 'Untitled Prompt'}`, { underline: true });
        doc.moveDown(0.3);
        doc.fontSize(12).text(prompt.content || 'No content');
        doc.moveDown(0.8);
        doc.fontSize(10).fillColor('gray').text(`Created: ${new Date(prompt.createdAt).toLocaleString()}`);
        doc.moveDown(1);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);
      });

      doc.end();

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    } catch (err) {
      reject(err);
    }
  });
};
