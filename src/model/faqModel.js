const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
      index: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 5000,
    }
  },
  { timestamps: true }
);

// Helpful compound index for searches
FaqSchema.index({ question: 'text', answer: 'text', tags: 1 });

module.exports = mongoose.model('Faq', FaqSchema);
