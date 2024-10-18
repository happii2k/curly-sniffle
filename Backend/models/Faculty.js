const mongoose = require('mongoose');

// Faculty Schema
const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
    },
    researchInterests: {
        type: [String], // Array of strings
    },
    officeHours: {
        type: String,
    },
}, { timestamps: true });

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
