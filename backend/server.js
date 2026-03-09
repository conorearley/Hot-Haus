import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import path from 'path';
import fs from 'fs';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { generateInvoicePdf } from './invoice.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:4242';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4242';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-01-27.acacia', maxNetworkRetries: 3 });

const app = express();

app.use(cors({
  origin: ['https://hothaus.netlify.app', 'https://www.hothaus.ie', 'https://hothaus.ie']
}));

/* ---------------- EMAIL ---------------- */

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  ORDER_NOTIFY_TO
} = process.env;

const mailTransport =
  SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      })
    : null;

async function sendInvoiceEmails({ customerEmail, shippingAddress, invoiceNumber, pdfPath, publicInvoiceUrl }) {
  if (!mailTransport) {
    console.log('Mail transport not configured');
    return;
  }

  const subject = `Your HotHaus invoice ${invoiceNumber}`;

  console.log('Attempting customer email send to:', customerEmail || '[empty]');

  if (customerEmail) {
    const info = await mailTransport.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: customerEmail,
      subject,
      text:
`Thanks for your order.

Shipping usually takes 2–3 weeks and we currently ship within Ireland only.

Invoice: ${invoiceNumber}
Download: ${publicInvoiceUrl}

HotHaus`,
      attachments: [{ filename: `${invoiceNumber}.pdf`, path: pdfPath }]
    });

    console.log('Customer email sent:', info.messageId);
  } else {
    console.log('Customer email skipped because no email was found');
  }

  if (ORDER_NOTIFY_TO) {
    const info = await mailTransport.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: ORDER_NOTIFY_TO,
      subject: `PAID order: ${invoiceNumber}`,
      text:
`Payment confirmed.

Invoice: ${invoiceNumber}
Customer: ${customerEmail}

Shipping address:
${shippingAddress}

Invoice link:
${publicInvoiceUrl}`,
      attachments: [{ filename: `${invoiceNumber}.pdf`, path: pdfPath }]
    });

    console.log('Business email sent:', info.messageId);
  }
}

/* ---------------- FILE PATHS ---------------- */

const publicDir = path.join(__dirname, 'public');
const invoicesDir = path.join(__dirname, 'invoices');
const counterPath = path.join(__dirname, 'invoice-counter.json');

app.use(express.static(publicDir));

fs.mkdirSync(invoicesDir, { recursive: true });
app.use('/invoices', express.static(invoicesDir));

/* ---------------- INVOICE NUMBER ---------------- */

function getNextInvoiceNumber() {

  let data;

  try {
    data = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
  } catch {
    data = { year: new Date().getFullYear(), counter: 0 };
  }

  const year = new Date().getFullYear();

  if (data.year !== year) {
    data.year = year;
    data.counter = 0;
  }

  data.counter++;

  fs.writeFileSync(counterPath, JSON.stringify(data, null, 2));

  return `HH-${year}-${String(data.counter).padStart(4, '0')}`;
}

/* ---------------- PRODUCTS ---------------- */

const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'products-data.json'), 'utf8')
);

function findProduct(productId) {

  for (const group of Object.values(productsData)) {

    if (Array.isArray(group)) {
      const p = group.find(x => x.id === productId);
      if (p) return p;
    }

    if (group && typeof group === 'object') {
      if (group.id === productId) return group;
    }

  }

  return null;
}

/* ---------------- ADDRESS FORMAT ---------------- */

function formatAddress(addr) {

  if (!addr) return "No address provided";

  return [
    addr.line1,
    addr.line2,
    addr.city,
    addr.postal_code,
    addr.country
  ].filter(Boolean).join("\n");
}

/* ---------------- BODY PARSER ---------------- */

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') return next();
  express.json({ limit: '1mb' })(req, res, next);
});

/* ---------------- CREATE CHECKOUT ---------------- */

app.post('/create-checkout-session', async (req, res) => {

  try {

    const { email, cart } = req.body;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
     return res.status(400).send("Invalid email address");
    }

    const lineItems = cart.map(item => {

      const product = findProduct(item.productId);

      const upgrades = (item.selectedUpgradeIds || [])
        .map(id => product.upgrades?.find(u => u.id === id))
        .filter(Boolean);

      const unit =
        Number(product.price) +
        upgrades.reduce((s,u)=>s+Number(u.price),0);

      return {
        quantity: item.quantity || 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(unit * 100),
          product_data: {
            name: product.name,description: upgrades.map(u => `${u.name} (+€${u.price})`).join(", ")
          }
        }
      };

    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel.html`,
      shipping_address_collection: { allowed_countries: ['IE'] },
      phone_number_collection: { enabled: true },
      metadata: { cart: JSON.stringify(cart) }
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

});
const invoiceIndexPath = path.join(invoicesDir, 'index.json');

function loadInvoiceIndex() {
  try {
    return JSON.parse(fs.readFileSync(invoiceIndexPath, 'utf8'));
  } catch {
    return {};
  }
}

function saveInvoiceIndex(idx) {
  fs.writeFileSync(invoiceIndexPath, JSON.stringify(idx, null, 2));
}
app.get('/invoice', (req, res) => {

  const sessionId = String(req.query.session_id || '');

  if (!sessionId) {
    return res.status(400).json({ status: 'missing_session_id' });
  }

  const idx = loadInvoiceIndex();
  const record = idx[sessionId];

  if (record?.pdfFile) {
    return res.json({ status: 'ready', url: `${PUBLIC_URL}/invoices/${record.pdfFile}` });
  }

  return res.json({ status: 'pending' });

});
/* ---------------- WEBHOOK ---------------- */

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error`);
  }

  try {

    if (event.type === 'checkout.session.completed') {

      const session = event.data.object;

      const full = await stripe.checkout.sessions.retrieve(session.id);

      const invoiceNumber = getNextInvoiceNumber();
      const pdfFile = `${invoiceNumber}.pdf`;
      const pdfPath = path.join(invoicesDir, pdfFile);

      const cart = JSON.parse(full.metadata?.cart || '[]');

const items = cart.map((item) => {
  const product = findProduct(item.productId);
  if (!product) return null;

  const upgrades = (item.selectedUpgradeIds || [])
    .map(id => product.upgrades?.find(u => u.id === id))
    .filter(Boolean);

  const upgradesText = upgrades.map(u => `${u.name} (+€${u.price})`);

  const qty = Number(item.quantity || 1);
  const unitAmount = Number(product.price) + upgrades.reduce((s, u) => s + Number(u.price), 0);
  const amount = unitAmount * qty;

  return {
    description: product.name,
    upgrades: upgradesText,
    quantity: qty,
    unitAmount,
    amount
  };
}).filter(Boolean);

await generateInvoicePdf({
  outPath: pdfPath,
  invoiceNumber,
  issuedAt: new Date(),
  currency: full.currency || 'eur',
  customer: {
    email:
      full.customer_details?.email ||
      full.customer_email ||
      session.customer_details?.email ||
      session.customer_email ||
      '',
    name:
      full.customer_details?.name ||
      session.customer_details?.name ||
      '',
    phone:
      full.customer_details?.phone ||
      session.customer_details?.phone ||
      '',
    address:
      full.customer_details?.address ||
      session.customer_details?.address ||
      null
  },
  items,
  amountTotal: (full.amount_total || 0) / 100
});

      const idx = loadInvoiceIndex();

          idx[session.id] = {
            pdfFile,
            invoiceNumber,
            createdAt: new Date().toISOString()
          };

          saveInvoiceIndex(idx);
      const publicInvoiceUrl = `${PUBLIC_URL}/invoices/${pdfFile}`;

      const customerEmail =
  full.customer_details?.email ||
  full.customer_email ||
  session.customer_details?.email ||
  session.customer_email ||
  '';

const customerAddress =
  full.customer_details?.address ||
  session.customer_details?.address ||
  null;

console.log('Webhook customer email:', customerEmail);

await sendInvoiceEmails({
  customerEmail,
  shippingAddress: formatAddress(customerAddress),
  invoiceNumber,
  pdfPath,
  publicInvoiceUrl
});

      console.log("Invoice generated:", pdfFile);

    }

  } catch (err) {
    console.error("Webhook error:", err);
  }

  res.json({ received: true });

});


/* ---------------- START SERVER ---------------- */

const port = Number(process.env.PORT || 4242);

app.listen(port, () => {
  console.log(`Server running on ${PUBLIC_URL}`);
});