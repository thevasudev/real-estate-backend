const mongoose = require('mongoose');

const ALLOWED_TYPES = [
  'villa',
  'house',
  'penthouse',
  'apartment',
  'studio',
  'townhouse',
  'bungalow',
  'land',
  'commercial',
  'arena_sports'
];

const STATUS = ['completed', 'ongoing', 'upcoming'];

const PropertySchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => Array.isArray(arr),
        message: 'images must be an array of strings (URLs)'
      }
    },
    type: {
      type: String,
      enum: ALLOWED_TYPES,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    features: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: STATUS,
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);
module.exports.ALLOWED_TYPES = ALLOWED_TYPES;
module.exports.STATUS = STATUS;
