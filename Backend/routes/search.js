const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// Search route - Example: /search?name=John&department=CS
router.get('/', async (req, res) => {
    try {
        const { name, department, research } = req.query;

        let query = {};
        
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
        }

        if (department) {
            query.department = { $regex: department, $options: 'i' };
        }

        if (research) {
            query.researchInterests = { $regex: research, $options: 'i' };
        }

        const results = await Faculty.find(query);

        res.json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

module.exports = router;

// Route to add faculty data
router.post('/add', async (req, res) => {
    try {
        const { name, department, email, contact, researchInterests, officeHours } = req.body;

        const newFaculty = new Faculty({
            name,
            department,
            email,
            contact,
            researchInterests,
            officeHours
        });

        await newFaculty.save();

        res.json({
            success: true,
            data: newFaculty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

