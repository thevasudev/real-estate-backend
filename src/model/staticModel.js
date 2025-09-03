const mongoose = require('mongoose');

const StaticSchema = new mongoose.Schema(
    {
       about:{
        type: String,
        required: false
       },
       privacy:{
        type: String,
        required: false
       },
       terms:{
        type: String,
        required: false
       },
       refundPolicy:{
        type: String,
        required: false
       }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Static', StaticSchema);