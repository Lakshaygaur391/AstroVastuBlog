const express = require('express');
const router = express.Router();
const {
  createConsultation,
  getConsultations,
  updateConsultation,
  deleteConsultation,
} = require('../controllers/consultationController');
const { protect } = require('../middleware/authMiddleware');

// Public booking creation
router.post('/', createConsultation);

// Admin routes
router.get('/', protect, getConsultations);
router.put('/:id', protect, updateConsultation);
router.delete('/:id', protect, deleteConsultation);

module.exports = router;
