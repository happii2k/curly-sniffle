const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pu_faculty', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
