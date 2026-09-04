const mongoose = require("mongoose");

/* The whole site content lives in a single document.
   This mirrors the frontend SiteContent object exactly, so the admin panel can
   push and pull it as one unit. `data` is intentionally schemaless (Mixed). */
const ContentSchema = new mongoose.Schema(
  {
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

const Content = mongoose.model("Content", ContentSchema);

/* Single admin account. Password is stored as a bcrypt hash. */
const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", AdminSchema);

/* Short-lived OTP codes. Kept in memory (fine for a single instance). */
const otpStore = new Map(); // email -> { code, expires }

const OTP_TTL_MS = 10 * 60 * 1000;

function setOtp(email, code) {
  otpStore.set(email.toLowerCase(), { code, expires: Date.now() + OTP_TTL_MS });
}

function checkOtp(email, code) {
  const entry = otpStore.get(email.toLowerCase());
  if (!entry) return false;
  if (Date.now() > entry.expires) {
    otpStore.delete(email.toLowerCase());
    return false;
  }
  if (entry.code !== code) return false;
  otpStore.delete(email.toLowerCase());
  return true;
}

module.exports = { Content, Admin, setOtp, checkOtp };
