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

      // Required fields missing check
      if (req.body.issue_title === '' || req.body.issue_text === '' || req.body.created_by === '') {
        res.json({ error: 'required field(s) missing' });
      }
      
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

    // PUT - URL/api/issues/:project
    .put(function (req, res){
      
      // Required fields missing check - 1
      if (!req.body.hasOwnProperty('_id')) {
        res.json({ error: 'missing _id' });
      }

      // Required fields missing check - 2
      if (!req.body.hasOwnProperty('issue_title') && 
          !req.body.hasOwnProperty('issue_text') && 
          !req.body.hasOwnProperty('created_by') && 
          !req.body.hasOwnProperty('assigned_to') && 
          !req.body.hasOwnProperty('open') && 
          !req.body.hasOwnProperty('status_text')) {
        res.json({ error: 'could not update', '_id': req.body._id });
      }

      // Hold each value
      temp1 = !req.body.hasOwnProperty('issue_title') ? '' : req.body.issue_title ;
      temp2 = !req.body.hasOwnProperty('issue_text') ? '' : req.body.issue_text ;
      temp3 = !req.body.hasOwnProperty('created_by') ? '' : req.body.created_by ;
      temp4 = !req.body.hasOwnProperty('assigned_to') ? '' : req.body.assigned_to ;
      temp5 = !req.body.hasOwnProperty('open') ? true : req.body.open ;
      temp6 = !req.body.hasOwnProperty('status_text') ? '' : req.body.status_text ;

      // Model and collection are made under the name of req.params.project
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);

      // Document is going to be updated
      Project.updateOne(
        { _id: { $eq: req.body._id } },
        { $set: {
            issue_title: temp1,
            issue_text: temp2,
            created_by: temp3,
            assigned_to: temp4,
            open: temp5,
            status_text: temp6,
          }
        },
        (err, doc) => {
          if (!err) {
            res.json({ result: 'successfully updated', '_id': req.body._id })
          } else {
            console.error(err);
          }
        }
      );
    })

    // DELETE - URL/api/issues/:project
    .delete(function (req, res){
      let project = req.params.project;
      //
    });
    
};
