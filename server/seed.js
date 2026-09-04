/* Creates the admin account and an empty content document.
   Run once after setting up .env:  npm run seed
   It is idempotent: running it again will not duplicate anything. */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Admin, Content } = require("./src/models");

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const email = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";

  if (!email) {
    console.error("ADMIN_EMAIL is not set in .env");
    process.exit(1);
  }

  const existing = await Admin.findOne();
  if (existing) {
    console.log(`Admin already exists (${existing.email}). Skipping account creation.`);
  } else {
    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash: hash });
    console.log(`Admin account created for ${email}`);
  }

  const content = await Content.findOne();
  if (content) {
    console.log("Content document already exists. Skipping.");
  } else {
    await Content.create({ data: {} });
    console.log("Empty content document created. Your local content will be pushed on first admin login.");
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
