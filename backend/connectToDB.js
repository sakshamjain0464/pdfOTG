import mongoose from 'mongoose'; // Import mongoose

// Connect to database
const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/pdfotg');
        console.log('Connected to Database');
    } catch (error) {
        console.log('Error connecting to MongoDB');
    }
}

export default connectToDB; // Export the connectToDB function