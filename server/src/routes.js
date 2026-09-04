const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Admin, Content, setOtp, checkOtp } = require("./models");

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase();

/* ------------------------------------------------------------------ */
/*  Email (OTP). Falls back to console logging when SMTP is not set.   */
/* ------------------------------------------------------------------ */

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function sendOtpEmail(to, code) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log(`\n[OTP] Email service not configured. Verification code for ${to}: ${code}\n`);
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "no-reply@example.com",
    to,
    subject: "Your verification code",
    html: `<p style="font-family:sans-serif">Your verification code is:</p>
           <h1 style="font-family:sans-serif;letter-spacing:6px">${code}</h1>
           <p style="font-family:sans-serif;color:#666">It expires in 10 minutes.</p>`,
  });
}

/* ------------------------------------------------------------------ */
/*  Auth helpers                                                       */
/* ------------------------------------------------------------------ */

function signToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "12h" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required." });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Session expired. Log in again." });
  }
}

/* ------------------------------------------------------------------ */
/*  Auth routes                                                        */
/* ------------------------------------------------------------------ */

router.post("/auth/login", async (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: "Password is required." });
  const admin = await Admin.findOne();
  if (!admin) return res.status(500).json({ error: "No admin account. Run `npm run seed` first." });
  const ok = await bcrypt.compare(String(password), admin.passwordHash);
  if (!ok) return res.status(401).json({ error: "Wrong password. Please try again." });
  res.json({ token: signToken(admin.email), email: admin.email });
});

router.post("/auth/otp", async (req, res) => {
  const { email } = req.body || {};
  const normalized = String(email || "").toLowerCase().trim();
  if (!normalized) return res.status(400).json({ error: "Email is required." });
  /* Only the registered admin email can request a code. */
  if (normalized !== ADMIN_EMAIL) return res.status(400).json({ error: "That email doesn't match the admin email on file." });
  const code = String(Math.floor(100000 + Math.random() * 900000));
  setOtp(normalized, code);
  try {
    await sendOtpEmail(normalized, code);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Could not send the email. Try again." });
  }
});

router.post("/auth/reset", async (req, res) => {
  const { email, otp, newPassword } = req.body || {};
  const normalized = String(email || "").toLowerCase().trim();
  if (!checkOtp(normalized, String(otp || ""))) return res.status(400).json({ error: "Incorrect or expired code." });
  if (!newPassword || String(newPassword).length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
  const admin = await Admin.findOne();
  if (!admin) return res.status(500).json({ error: "No admin account found." });
  admin.passwordHash = await bcrypt.hash(String(newPassword), 10);
  await admin.save();
  res.json({ ok: true });
});

router.post("/auth/password", requireAuth, async (req, res) => {
  const { currentPassword, otp, newPassword } = req.body || {};
  const admin = await Admin.findOne();
  if (!admin) return res.status(500).json({ error: "No admin account found." });
  const ok = await bcrypt.compare(String(currentPassword || ""), admin.passwordHash);
  if (!ok) return res.status(400).json({ error: "Current password is incorrect." });
  if (!checkOtp(admin.email, String(otp || ""))) return res.status(400).json({ error: "Incorrect or expired code." });
  if (!newPassword || String(newPassword).length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
  admin.passwordHash = await bcrypt.hash(String(newPassword), 10);
  await admin.save();
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/*  Content routes                                                     */
/* ------------------------------------------------------------------ */

function publicView(data) {
  const { settings, messages, ...rest } = data || {};
  return {
    ...rest,
    settings: settings ? { ...settings, adminPassword: "", resume: settings.resume } : undefined,
  };
}

router.get("/content", async (req, res) => {
  const doc = await Content.findOne();
  const data = doc && doc.data && doc.data.hero ? doc.data : null;
  if (!data) return res.json({ content: null, empty: true });
  res.json({ content: publicView(data), empty: false });
});

router.get("/content/full", requireAuth, async (req, res) => {
  const doc = await Content.findOne();
  const data = doc && doc.data && doc.data.hero ? doc.data : null;
  if (!data) return res.json({ content: null, empty: true });
  res.json({ content: data, empty: false });
});

router.put("/content", requireAuth, async (req, res) => {
  const { content } = req.body || {};
  if (!content || typeof content !== "object") return res.status(400).json({ error: "Invalid content." });

  const doc = (await Content.findOne()) || new Content({ data: {} });

  /* Merge messages by id so a visitor submission is not lost if it lands
     between the admin's fetch and this save. */
  const incomingMessages = Array.isArray(content.messages) ? content.messages : [];
  const existingMessages = Array.isArray(doc.data.messages) ? doc.data.messages : [];
  const byId = new Map();
  [...existingMessages, ...incomingMessages].forEach((m) => {
    if (m && m.id) byId.set(m.id, m);
  });
  const mergedMessages = Array.from(byId.values()).sort((a, b) => (a.date < b.date ? 1 : -1));

  doc.data = { ...content, messages: mergedMessages };
  await doc.save();
  res.json({ ok: true });
});

/* Public contact form submission. Appends to the content document. */
router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) return res.status(400).json({ error: "All fields are required." });

  const doc = (await Content.findOne()) || new Content({ data: {} });
  if (!Array.isArray(doc.data.messages)) doc.data.messages = [];
  doc.data.messages.unshift({
    id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
    name: String(name),
    email: String(email),
    subject: String(subject),
    message: String(message),
    date: new Date().toISOString(),
    read: false,
  });
  await doc.save();
  res.json({ ok: true });
});

/* ------------------------------------------------------------------ */
/*  Uploads                                                            */
/* ------------------------------------------------------------------ */

const uploadsDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(0, 8);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
});

router.post("/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
