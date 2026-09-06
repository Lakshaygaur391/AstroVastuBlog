const Consultation = require('../models/Consultation');
const jwt = require('jsonwebtoken');

// @desc    Create new consultation booking
// @route   POST /api/consultations
// @access  Public / Authenticated User
const createConsultation = async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({
        message: 'Please provide all required fields: name, email, phone, date, and time.',
      });
    }

    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch {
        // Continue even if token is invalid or guest
      }
    }

    const consultation = await Consultation.create({
      name,
      email,
      phone,
      service: service || 'Complete Life Guidance',
      date,
      time,
      message: message || '',
      status: 'Pending',
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Consultation booking requested successfully.',
      consultation,
    });
  } catch (error) {
    console.error('Create consultation error:', error);
    res.status(500).json({ message: 'Error creating consultation booking.' });
  }
};

// @desc    Get all consultations
// @route   GET /api/consultations
// @access  Private / Admin
const getConsultations = async (req, res) => {
  try {
    const { status, service, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (service && service !== 'All') {
      filter.service = service;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const consultations = await Consultation.find(filter).sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ message: 'Error fetching consultations.' });
  }
};

// @desc    Update consultation status or admin notes
// @route   PUT /api/consultations/:id
// @access  Private / Admin
const updateConsultation = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation booking not found.' });
    }

    if (status) {
      const allowed = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` });
      }
      consultation.status = status;
    }

    if (notes !== undefined) {
      consultation.notes = notes;
    }

    const updated = await consultation.save();
    res.json(updated);
  } catch (error) {
    console.error('Update consultation error:', error);
    res.status(500).json({ message: 'Error updating consultation booking.' });
  }
};

// @desc    Delete consultation
// @route   DELETE /api/consultations/:id
// @access  Private / Admin
const deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation booking not found.' });
    }

    await consultation.deleteOne();
    res.json({ message: 'Consultation booking deleted successfully.' });
  } catch (error) {
    console.error('Delete consultation error:', error);
    res.status(500).json({ message: 'Error deleting consultation booking.' });
  }
};

module.exports = {
  createConsultation,
  getConsultations,
  updateConsultation,
  deleteConsultation,
};
