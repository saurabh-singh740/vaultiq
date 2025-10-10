const PDFDocument = require('pdfkit');

exports.generatePromptsPDF = async (prompts) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      // ===== HEADER DESIGN =====
      doc
        .fillColor('#1E1E1E')
        .fontSize(28)
        .font('Helvetica-Bold')
        .text('PromptVault Export', { align: 'center' });
      doc.moveDown(0.3);

      doc
        .fontSize(12)
        .fillColor('#666666')
        .text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

      doc.moveDown(1.5);
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor('#AAAAAA')
        .stroke();
      doc.moveDown(1.5);

      // ===== CONTENT =====
      prompts.forEach((prompt, index) => {
        doc
          .fontSize(16)
          .fillColor('#2B2B2B')
          .font('Helvetica-Bold')
          .text(`${index + 1}. ${prompt.title || 'Untitled Prompt'}`);

        doc.moveDown(0.4);

        doc
          .fontSize(12)
          .fillColor('#333333')
          .font('Helvetica')
          .text(prompt.content || 'No content provided.', {
            align: 'justify',
          });

        doc.moveDown(0.8);

        doc
          .fontSize(10)
          .fillColor('#888888')
          .font('Helvetica-Oblique')
          .text(`Created: ${new Date(prompt.createdAt).toLocaleString()}`);

        doc.moveDown(1);

        // Divider line
        doc
          .moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .strokeColor('#DDDDDD')
          .stroke();

        doc.moveDown(1.2);
      });

      // ===== FOOTER =====
      doc.on('pageAdded', () => {
        doc
          .fontSize(10)
          .fillColor('#999999')
          .text('PromptVault © 2025 | All Rights Reserved', 50, 750, { align: 'center' });
      });

      doc.end();

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    } catch (err) {
      reject(err);
    }
  });
};
