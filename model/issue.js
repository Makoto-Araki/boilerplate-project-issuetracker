// Import
const mongoose = require('mongoose');

// Schema
const issueSchema = new mongoose.Schema({
  assined_to: { type: String },
  created_by: { type: String },
  issue_text: { type: String },
  issue_title: { type: String },
  open: { type: Boolean },
  status_text: { type: String },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

// Model export
module.exports = mongoose.model('Issue', issueSchema);
