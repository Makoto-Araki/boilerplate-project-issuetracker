'use strict';

// Import & Config
const mongoose = require('mongoose');
const parser = require('body-parser');
require('dotenv').config();

// Secrets
const user = process.env['user']
const pass = process.env['pass']
const option = process.env['option']
const database = process.env['database']

// Mongo_URI
const mongo_URI = `mongodb+srv://${user}:${pass}@${cluster}/${database}?${option}`;
  
// MongoDB Connect Config
mongoose.set('strictQuery', false);

// MongoDB Connect
mongoose
.connect(mongo_URI)
.then(() => console.log('Database connection successed'))
.catch((err) => console.error(err))

// Schema
const projectSchema = new mongoose.Schema({
  issue_title: { type: String },
  issue_text: { type: String },
  assined_to: { type: String },
  created_by: { type: String },
  open: { type: Boolean },
  status_text: { type: String },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

module.exports = function (app) {
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      //
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);
    })
    
    .put(function (req, res){
      let project = req.params.project;
      //
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      //
    });
    
};
