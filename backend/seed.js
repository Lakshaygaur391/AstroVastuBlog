// Creates the first admin account from the .env values.
// Run with: npm run seed
require('dotenv').config();
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

const run = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin account already exists for ${email}. Nothing to do.`);
    process.exit(0);
  }

  await Admin.create({ name, email, password });
  console.log(`Admin account created for ${email}. You can now log in from /admin/login.`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
