import fs from "fs";
import PDFDocument from "pdfkit";

const VAT_RATE = 0.135;
const BUSINESS_NAME = "Hot Haus Saunas";
const BUSINESS_ADDRESS = "Ireland";
const VAT_NUMBER = "IE3715194HH";

function formatMoney(v, currency = "EUR") {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency
  }).format(Number(v || 0));
}

export async function generateInvoicePdf({
  outPath,
  invoiceNumber,
  issuedAt,
  currency,
  customer,
  items,
  amountTotal
}) {
  return new Promise((resolve, reject) => {

    const subtotal = amountTotal / (1 + VAT_RATE);
    const vatAmount = amountTotal - subtotal;

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = fs.createWriteStream(outPath);

    doc.pipe(stream);

    const colDesc = 50;
    const colQty = 350;
    const colUnit = 410;
    const colAmt = 500;

    /* HEADER */

    doc.fontSize(24).text(BUSINESS_NAME, 50, 50);

    doc.fontSize(10)
      .text(BUSINESS_ADDRESS)
      .text(`VAT: ${VAT_NUMBER}`);

    doc.fontSize(20)
      .text("INVOICE", 400, 50, { align: "right" });

    doc.fontSize(10)
      .text(`Invoice #: ${invoiceNumber}`, 400, 80, { align: "right" })
      .text(`Date: ${issuedAt.toISOString().slice(0,10)}`, { align: "right" });

    doc.moveTo(50,100).lineTo(545,100).stroke();

    doc.moveDown(3);

    /* BILL TO */

    doc.fontSize(12).text("Bill To");

    doc.fontSize(10);

    if (customer?.name) doc.text(customer.name);
    if (customer?.email) doc.text(customer.email);
    if (customer?.phone) doc.text(customer.phone);

    const a = customer?.address;
    if (a) {
      const parts = [
        a.line1,
        a.line2,
        a.city,
        a.postal_code,
        a.country
      ].filter(Boolean);

      doc.text(parts.join(", "));
    }

    doc.moveDown();

    /* TABLE HEADER */

    const tableTop = doc.y;

    doc.fontSize(10).font("Helvetica-Bold");

    doc.text("Description", colDesc, tableTop);
    doc.text("Qty", colQty, tableTop);
    doc.text("Unit", colUnit, tableTop);
    doc.text("Amount", colAmt, tableTop);

    doc.moveTo(colDesc, tableTop + 15)
      .lineTo(545, tableTop + 15)
      .stroke();

    doc.font("Helvetica");

    let y = tableTop + 25;

    /* ITEMS */

    items.forEach(item => {

      const mainProduct = String(item.description || "Item");
      const upgrades = item.upgrades || [];

      // Product name
      doc.font("Helvetica-Bold")
        .fontSize(10)
        .text(mainProduct, colDesc, y, { width: 280 });

      doc.font("Helvetica");

      let upgradeY = y + 14;

      // Render upgrades
      upgrades.forEach(up => {
        doc.fontSize(9)
          .fillColor("#555")
          .text(`• ${up}`, colDesc + 10, upgradeY, { width: 260 });

        upgradeY += 12;
      });

      doc.fillColor("#000").fontSize(10);

      // Price columns (NO WRAPPING)
      doc.text(String(item.quantity), colQty, y, { width: 40, align: "right" });

doc.text(
  formatMoney(item.unitAmount, currency),
  colUnit,
  y,
  { width: 90, align: "right" }
);

doc.text(
  formatMoney(item.amount, currency),
  colAmt,
  y,
  { width: 90, align: "right" }
);

      y = upgradeY + 10;

    });

    /* TOTALS */

    const totalsY = y + 30;

    doc.text("Subtotal (ex VAT)", 360, totalsY);
    doc.text(formatMoney(subtotal,currency), colAmt, totalsY, { width: 70, align: "right" });

    doc.text(`VAT (${(VAT_RATE*100).toFixed(1)}%)`, 360, totalsY + 18);
    doc.text(formatMoney(vatAmount,currency), colAmt, totalsY + 18, { width: 70, align: "right" });

    doc.moveTo(360, totalsY + 36)
      .lineTo(545, totalsY + 36)
      .stroke();

    doc.font("Helvetica-Bold");

    doc.text("Total (inc VAT)", 360, totalsY + 45);
    doc.text(formatMoney(amountTotal,currency), colAmt, totalsY + 45, { width: 70, align: "right" });

    doc.font("Helvetica");

    /* FOOTER */

    const footerY = totalsY + 100;

    doc.moveTo(50, footerY)
      .lineTo(545, footerY)
      .stroke();

    doc.fontSize(9);

    doc.text(
      "Payment received via Stripe.",
      50,
      footerY + 10,
      { width: 500 }
    );

    doc.text(
      "Estimated delivery time: 2–3 weeks. Our team will contact you to arrange delivery.",
      50,
      footerY + 25,
      { width: 500 }
    );

    doc.text(
      `Thank you for choosing ${BUSINESS_NAME}.`,
      50,
      footerY + 40,
      { width: 500 }
    );

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);

  });
}