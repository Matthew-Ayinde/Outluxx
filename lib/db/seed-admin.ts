/**
 * Upserts an admin user without touching any other data.
 * Run with: npm run seed:admin
 *
 * Credentials can be overridden via env:
 *   SEED_ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRST_NAME, ADMIN_LAST_NAME
 *
 * Deliberately NOT ADMIN_EMAIL — that var is the order-notification
 * recipient (see lib/email/order.ts) and must stay independent of the
 * seeded admin login, otherwise pointing order emails at a new inbox
 * would silently change who can sign in to /admin.
 */

import "dotenv/config";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const ADMIN_EMAIL = (process.env.SEED_ADMIN_EMAIL || "admin@outlxx.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin1234!";
const ADMIN_FIRST_NAME = process.env.ADMIN_FIRST_NAME || "Admin";
const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || "Outlxx";

const CustomerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    passwordHash: String,
    role: { type: String, default: "customer" },
    addresses: [],
  },
  { timestamps: true }
);

async function seedAdmin() {
  console.log("🌱 Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅ Connected");

  const CustomerModel = mongoose.model("Customer", CustomerSchema);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const existing = await CustomerModel.exists({ email: ADMIN_EMAIL });
  await CustomerModel.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      $set: {
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        passwordHash,
        role: "admin",
      },
      $setOnInsert: { addresses: [] },
    },
    { upsert: true, returnDocument: "after" }
  );

  console.log(`✅ Admin user ready (${existing ? "updated" : "created"}):`);
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`   Sign in at /account/sign-in → redirects to /admin`);

  await mongoose.disconnect();
}

seedAdmin().catch((e) => {
  console.error("❌ Admin seed failed:", e);
  process.exit(1);
});
