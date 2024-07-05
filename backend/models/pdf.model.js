import mongoose from 'mongoose';   // Import mongoose for creating model

// Schema for storing pdf information
const pdfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Create a model
const PDF = mongoose.model('PDF', pdfSchema);

export default PDF; // Export the model