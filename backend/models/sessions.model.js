const mongoose = require('mongoose');  // Import mongoose

// Create a schema for sessions
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {expireAfterSeconds: 24 * 60 * 60 * 1000});

const Session = mongoose.model('Session', sessionSchema);  // Create model for session schema

module.exports = Session;         // Export the model