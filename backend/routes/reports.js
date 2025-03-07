const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Generate a random 8-character report ID
function generateReportID() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Create a new report
router.post('/', async (req, res) => {
    try {
        const reportData = { ...req.body, reportID: generateReportID() };
        const report = new Report(reportData);
        await report.save();
        res.status(201).send(report);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update report status
router.patch('/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).send(report);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;