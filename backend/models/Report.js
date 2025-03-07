const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    rat: { type: String, required: true, maxlength: 100 },
    knownAliases: { type: [String], maxlength: 100 },
    discord: { type: String },
    discordDisplayName: { type: String },
    discordAliases: { type: [String] },
    discordDisplayNameAliases: { type: [String] },
    currentGuild: { type: String, maxlength: 100 },
    previousGuilds: { type: [String], maxlength: 100 },
    dateOfIncident: { type: Date, required: true },
    incidentReport: { type: String, required: true },
    evidence: { type: String },
    status: { type: String, enum: ['Verified', 'Unverified', 'Insufficient Evidence'], default: 'Unverified' },
    created_at: { type: Date, default: Date.now },
    reportID: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Report', reportSchema);