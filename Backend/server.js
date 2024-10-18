const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a Mongoose schema for the request data (Form Submission)
const requestSchema = new mongoose.Schema({
    name: String,
    email: String,
    department: String,
    details: String,
});

// Define a Mongoose schema for the faculty data (Faculty Search)
const facultySchema = new mongoose.Schema({
    name: String,
    department: String,
    email: String,
});

// Define models using the schemas
const Request = mongoose.model('Request', requestSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/puFaculty', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

// Route to handle form submission (POST /submit-request)
app.post('/submit-request', async (req, res) => {
    const { name, email, department, details } = req.body;

    // Check if all fields are present
    if (!name || !email || !department || !details) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new request document
        const newRequest = new Request({
            name,
            email,
            department,
            details
        });

        // Save the document to the database
        await newRequest.save();
        console.log('Data saved successfully');

        res.status(200).json({ message: 'Request submitted successfully' });
    } catch (error) {
        console.log('Error saving data: ', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to handle faculty search (GET /search-faculty)
app.get('/search-faculty', async (req, res) => {
    const searchQuery = req.query.query;

    try {
        // Use a regex to perform a case-insensitive search
        const facultyList = await Faculty.find({
            name: { $regex: searchQuery, $options: 'i' },
        });

        res.status(200).json(facultyList);
    } catch (error) {
        console.error('Error fetching faculty data:', error);
        res.status(500).json({ message: 'Error fetching faculty data' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
