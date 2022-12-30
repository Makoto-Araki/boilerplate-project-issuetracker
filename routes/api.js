'use strict';

// Import & Config
const mongoose = require('mongoose');


// Schema
const projectSchema = new mongoose.Schema({
  issue_title: { type: String },
  issue_text: { type: String },
  created_by: { type: String },
  assigned_to: { type: String },
  open: { type: Boolean, default: true },
  status_text: { type: String },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
});

module.exports = function (app) {
  app.route('/api/issues/:project')

    // GET - URL/api/issues/:project
    .get(function (req, res){
      
      // Model and collection are made under the name of req.params.project
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);

      // For Debug
      console.dir('AAA : ' + req.query);
      console.log('BBB : ' + req.query);

      // Processing changes depending on whether req.query is specified
      if (!req.query) {
        Project
          .find({})
          .exec((err, doc) => {
            if (!err) {
              res.json(doc);
            } else {
              console.error(err);
            }
          });
      } else {
        Project
          .find(req.query)
          .exec((err, doc) => {
            if (!err) {
              res.json(doc);
            } else {
              console.error(err);
            }
          });
      }
    })

    // POST - URL/api/issues/:project
    .post(function (req, res){
      
      // Model and collection are made under the name of req.params.project
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);
      let entry = new Project();

      // Form data is set in document
      entry.issue_title = req.body.issue_title;
      entry.issue_text = req.body.issue_text;
      entry.created_by = req.body.created_by;
      entry.assigned_to = req.body.assigned_to;
      entry.status_text = req.body.status_text;

      // Document is going to be saved
      entry.save((err, doc) => {
        if (!err) {
          res.json({
            _id: doc._id,
            issue_title: doc.issue_title,
            issue_text: doc.issue_text,
            created_by: doc.created_by,
            assigned_to: doc.assigned_to,
            open: doc.open,
            status_text: doc.status_text,
            created_on: doc.created_on,
            updated_on: doc.updated_on,
          });
        } else {
          console.error(err);
        }
      });
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
