'use strict';

// Import
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

      // Document is going to be selected
      Project
        .find(req.query)
        .select({ __v: 0 })
        .exec((err, doc) => {
          if (!err) {
            res.json(doc);
          } else {
            console.error(err);
          }
        });
    })

    // POST - URL/api/issues/:project
    .post(function (req, res){

      // Required fields missing check
      if (!req.body.hasOwnProperty('issue_title') ||
          !req.body.hasOwnProperty('issue_text') ||
          !req.body.hasOwnProperty('created_by')) {
        res.json({ error: 'required field(s) missing' });
      }

      // Hold each value
      let temp1 = !req.body.hasOwnProperty('issue_title') ? '' : req.body.issue_title ;
      let temp2 = !req.body.hasOwnProperty('issue_text') ? '' : req.body.issue_text ;
      let temp3 = !req.body.hasOwnProperty('created_by') ? '' : req.body.created_by ;
      let temp4 = !req.body.hasOwnProperty('assigned_to') ? '' : req.body.assigned_to ;
      let temp5 = !req.body.hasOwnProperty('status_text') ? '' : req.body.status_text ;

      // Model and collection are made under the name of req.params.project
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);
      let entry = new Project();

      // Form data is set in document
      entry.issue_title = temp1;
      entry.issue_text = temp2;
      entry.created_by = temp3;
      entry.assigned_to = temp4;
      entry.status_text = temp5;

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
      let temp1 = !req.body.hasOwnProperty('issue_title') ? '' : req.body.issue_title ;
      let temp2 = !req.body.hasOwnProperty('issue_text') ? '' : req.body.issue_text ;
      let temp3 = !req.body.hasOwnProperty('created_by') ? '' : req.body.created_by ;
      let temp4 = !req.body.hasOwnProperty('assigned_to') ? '' : req.body.assigned_to ;
      let temp5 = !req.body.hasOwnProperty('open') ? true : req.body.open ;
      let temp6 = !req.body.hasOwnProperty('status_text') ? '' : req.body.status_text ;

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
            updated_on: new Date(),
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

      // Required fields missing check
      if (!req.body.hasOwnProperty('_id')) {
        res.json({ error: 'missing _id' });
      }

      // Model and collection are made under the name of req.params.project
      let project = req.params.project;
      let Project = mongoose.model(project, projectSchema);

      // Document is going to be deleted
      Project
        .findById(req.body._id)
        .exec((err, doc) => {
          if (!doc) {
            res.json({ error: 'could not delete', '_id': req.body._id });
          } else {
            Project.deleteOne(
              { _id: { $eq: req.body._id } },
              (err, doc) => {
                if (!err) {
                  res.json({ result: 'successfully deleted', '_id': req.body._id })
                } else {
                  console.error(err);
                }
              }
            );
          }
        });
    });
};
