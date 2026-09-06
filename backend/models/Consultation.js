const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 30,
    },
    service: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true,
      default: 'Complete Life Guidance',
    },
    date: {
      type: String,
      required: [true, 'Preferred date is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Preferred time is required'],
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

consultationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Consultation', consultationSchema);
