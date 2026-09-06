require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  require('dotenv').config();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

configureCloudinary();

const isCloudinaryConfigured = () => {
  configureCloudinary();
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  configureCloudinary,
};
