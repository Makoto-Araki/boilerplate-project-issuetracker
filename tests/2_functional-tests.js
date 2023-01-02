const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // Timeout 5 seconds
  this.timeout(5000);

  // Hold value
  let id1 = '';
  let id2 = '';
  let missing = 'AAAfb4acf9b116416156dBBB';
  let id1_created = '';
  let id1_updated = '';
  let id2_created = '';
  let id2_updated = '';

  /* ------------------------------------------------------- */

  // POST - URL/api/issues/:project
  test('Create an issue with every field', (done) => {
    chai
      .request(server)
      .post('/api/issues/sample')
      .send({
        issue_title: 'Bug-001',
        issue_text: 'Bug-001 text',
        created_by: 'John',
        assigned_to: 'Kate',
        status_text: 'fixing',
      })
      .end((err, res) => {
        
        // Hold value
        id1 = res.body._id;
        id1_created = res.body.created_on;
        id1_updated = res.body.updated_on;

        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isNotNull(res.body._id);
        assert.equal(res.body.issue_title, 'Bug-001');
        assert.equal(res.body.issue_text, 'Bug-001 text');
        assert.equal(res.body.created_by, 'John');
        assert.equal(res.body.assigned_to, 'Kate');
        assert.isBoolean(res.body.open);
        assert.equal(res.body.status_text, 'fixing');
        assert.isNotNull(res.body.created_on);
        assert.isNotNull(res.body.updated_on);
        
        done();
      });
  });

  // POST - URL/api/issues/:project
  test('Create an issue with only required fields', (done) => {
    chai
      .request(server)
      .post('/api/issues/sample')
      .send({
        issue_title: 'Bug-002',
        issue_text: 'Bug-002 text',
        created_by: 'Smith',
      })
      .end((err, res) => {
        
        // Hold value
        id2 = res.body._id;
        id2_created = res.body.created_on;
        id2_updated = res.body.updated_on;
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isNotNull(res.body._id);
        assert.equal(res.body.issue_title, 'Bug-002');
        assert.equal(res.body.issue_text, 'Bug-002 text');
        assert.equal(res.body.created_by, 'Smith');
        assert.equal(res.body.assigned_to, '');
        assert.isBoolean(res.body.open);
        assert.equal(res.body.status_text, '');
        assert.isNotNull(res.body.created_on);
        assert.isNotNull(res.body.updated_on);
        
        done();
      });
  });

  // POST - URL/api/issues/:project
  test('Create an issue with missing required fields', (done) => {
    chai
      .request(server)
      .post('/api/issues/sample')
      .send({
        assigned_to: 'Kate',
        status_text: 'fixing',
      })
      .end((err, res) => {

        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'required field(s) missing');
        
        done();
      });
  });
  
  // GET - URL/api/issues/:project
  test('View issues on a project', (done) => {
    chai
      .request(server)
      .get('/api/issues/sample')
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body[0]._id, id1);
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'John');
        assert.equal(res.body[0].assigned_to, 'Kate');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].created_on, id1_created);
        assert.equal(res.body[0].updated_on, id1_updated);
        assert.equal(res.body[1]._id, id2);
        assert.equal(res.body[1].issue_title, 'Bug-002');
        assert.equal(res.body[1].issue_text, 'Bug-002 text');
        assert.equal(res.body[1].created_by, 'Smith');
        assert.equal(res.body[1].assigned_to, '');
        assert.equal(res.body[1].open, true);
        assert.equal(res.body[1].status_text, '');
        assert.equal(res.body[1].created_on, id2_created);
        assert.equal(res.body[1].updated_on, id2_updated);
        
        done();
      });
  });

  // GET - URL/api/issues/:project
  test('View issues on a project with one filter', (done) => {
    chai
      .request(server)
      .get('/api/issues/sample')
      .query({ created_by: 'John' })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body[0]._id, id1);
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'John');
        assert.equal(res.body[0].assigned_to, 'Kate');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].created_on, id1_created);
        assert.equal(res.body[0].updated_on, id1_updated);
        
        done();
      });
  });

  // GET - URL/api/issues/:project
  test('View issues on a project with multiple filters', (done) => {
    chai
      .request(server)
      .get('/api/issues/sample')
      .query({
         open: true,
         created_by: 'John',
         assigned_to: 'Kate',
      })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body[0]._id, id1);
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'John');
        assert.equal(res.body[0].assigned_to, 'Kate');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].created_on, id1_created);
        assert.equal(res.body[0].updated_on, id1_updated);
        
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update one field on an issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/sample')
      .send({
        _id: id1,
        status_text: 'fixed',
      })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, id1);
        
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update multiple fields on an issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/sample')
      .send({
        _id: id2,
        open: false,
        assigned_to: 'Kate',
        status_text: 'fixing',
      })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, id2);
        
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with missing', (done) => {
    chai
      .request(server)
      .put('/api/issues/sample')
      .send({
        _id: missing,
        assigned_to: 'Kate',
        status_text: 'fixing',
      })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'could not update');
        assert.equal(res.body._id, missing);
        
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with no fields to update', (done) => {
    chai
      .request(server)
      .put('/api/issues/sample')
      .send({ _id: id2 })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'no update field(s) sent');
        assert.equal(res.body._id, id2);
        
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with an invalid', (done) => {
    chai
      .request(server)
      .put('/api/issues/sample')
      .send({
        _id: id2,  // open = false i.e. invalid
        status_text: 'fixed',
      })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, id2);
        
        done();
      });
  });

  // DELETE - URL/api/issues/:project
  test('Delete an issue', (done) => {
    chai
      .request(server)
      .delete('/api/issues/sample')
      .send({ _id: id1 })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, id1);
        
        done();
      });
  });

  // DELETE - URL/api/issues/:project
  test('Delete an issue with an invalid', (done) => {
    chai
      .request(server)
      .delete('/api/issues/sample')
      .send({ _id: id2 })  // open = false i.e. invalid
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, id2);
        
        done();
      });
  });

  // DELETE - URL/api/issues/:project
  test('Delete an issue with missing', (done) => {
    chai
      .request(server)
      .delete('/api/issues/sample')
      .send({ _id: missing })
      .end((err, res) => {
        
        // Evaluation
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'could not delete');
        assert.equal(res.body._id, missing);
        
        done();
      });
  });

  /* ------------------------------------------------------- */
  
});
