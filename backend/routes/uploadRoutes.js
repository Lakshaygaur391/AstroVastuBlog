const express = require('express');
const multer = require('multer');
const { Readable } = require('stream');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure Multer with memory storage
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WEBP, and GIF images are allowed'), false);
  }
};

const videoFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska', 'video/x-msvideo'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only MP4, WEBM, MOV, MKV, and AVI video formats are allowed'), false);
  }
};

// 10MB limit for images, 100MB limit for videos
const uploadImage = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });
const uploadVideo = multer({ storage, fileFilter: videoFilter, limits: { fileSize: 100 * 1024 * 1024 } });

// Helper to stream upload to Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    Readable.from(buffer).pipe(uploadStream);
  });
};

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload/image
// @access  Private (Admin)
router.post('/image', protect, uploadImage.single('file'), async (req, res) => {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(400).json({
        message:
          'Cloudinary is not configured yet. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env',
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'astrovastupragati/images',
      resource_type: 'image',
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Cloudinary image upload error:', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
});

// @desc    Upload a video to Cloudinary
// @route   POST /api/upload/video
// @access  Private (Admin)
router.post('/video', protect, uploadVideo.single('file'), async (req, res) => {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(400).json({
        message:
          'Cloudinary is not configured yet. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env',
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'astrovastupragati/videos',
      resource_type: 'video',
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      duration: result.duration,
      format: result.format,
    });
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    res.status(500).json({ message: error.message || 'Video upload failed' });
  }
});

module.exports = router;
