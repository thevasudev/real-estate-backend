const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
       role: { type: String, trim: true },
       description: { type: String, trim: true },
       image: { type: String, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', TeamSchema);