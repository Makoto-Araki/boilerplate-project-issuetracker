const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /* ------------------------------------------------------- */

  // Timeout 5 seconds
  this.timeout(5000);

  /* ------------------------------------------------------- 

  // POST - URL/api/issues/:project
  test('Create an issue with every field', (done) => {
    chai
      .request(server)
      .post('/api/issues/project1')
      .send({
        issue_title: 'Bug-001',
        issue_text: 'Bug-001 text',
        created_by: 'admin',
        assigned_to: 'makoto',
        status_text: 'fixing',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isNotNull(res.body._id);
        assert.equal(res.body.issue_title, 'Bug-001');
        assert.equal(res.body.issue_text, 'Bug-001 text');
        assert.equal(res.body.created_by, 'admin');
        assert.equal(res.body.assigned_to, 'makoto');
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
      .post('/api/issues/project1')
      .send({
        issue_title: 'Bug-002',
        issue_text: 'Bug-002 text',
        created_by: 'admin',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isNotNull(res.body._id);
        assert.equal(res.body.issue_title, 'Bug-002');
        assert.equal(res.body.issue_text, 'Bug-002 text');
        assert.equal(res.body.created_by, 'admin');
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
      .post('/api/issues/project1')
      .send({
        assigned_to: 'makoto',
        status_text: 'fixing',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'required field(s) missing');
        done();
      });
  });
  
  /* ------------------------------------------------------- 

  // GET - URL/api/issues/:project
  test('View issues on a project', (done) => {
    chai
      .request(server)
      .get('/api/issues/project2')
      .end((err, res) => {

        // status and length
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.length, 4);
        
        // res.body[0]
        assert.equal(res.body[0].assigned_to, 'makoto');
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0]._id, '63afb4acf9b116416156dfa8');
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'admin');
        assert.equal(res.body[0].created_on, '2022-12-31T04:03:56.124Z');
        assert.equal(res.body[0].updated_on, '2022-12-31T04:03:56.124Z');

        // res.body[1]
        assert.equal(res.body[1].assigned_to, 'takeshi');
        assert.equal(res.body[1].status_text, 'fixed');
        assert.equal(res.body[1].open, false);
        assert.equal(res.body[1]._id, '63afb4c8f9b116416156dfaa');
        assert.equal(res.body[1].issue_title, 'Bug-002');
        assert.equal(res.body[1].issue_text, 'Bug-002 text');
        assert.equal(res.body[1].created_by, 'admin');
        assert.equal(res.body[1].created_on, '2022-12-31T04:04:24.789Z');
        assert.equal(res.body[1].updated_on, '2022-12-31T04:12:16.176Z');

        // res.body[2]
        assert.equal(res.body[2].assigned_to, 'takeshi');
        assert.equal(res.body[2].status_text, 'fixed');
        assert.equal(res.body[2].open, false);
        assert.equal(res.body[2]._id, '63afb707cbcc6d65c6d2a4d5');
        assert.equal(res.body[2].issue_title, 'Bug-003');
        assert.equal(res.body[2].issue_text, 'Bug-003 text');
        assert.equal(res.body[2].created_by, 'admin');
        assert.equal(res.body[2].created_on, '2022-12-31T04:13:59.819Z');
        assert.equal(res.body[2].updated_on, '2022-12-31T04:16:29.272Z');

        // res.body[3]
        assert.equal(res.body[3].assigned_to, 'makoto');
        assert.equal(res.body[3].status_text, 'fixing');
        assert.equal(res.body[3].open, true);
        assert.equal(res.body[3]._id, '63afb880cbcc6d65c6d2a4de');
        assert.equal(res.body[3].issue_title, 'Bug-004');
        assert.equal(res.body[3].issue_text, 'Bug-004 text');
        assert.equal(res.body[3].created_by, 'admin');
        assert.equal(res.body[3].created_on, '2022-12-31T04:20:16.694Z');
        assert.equal(res.body[3].updated_on, '2022-12-31T04:20:16.694Z');

        done();
      });
  });

  // GET - URL/api/issues/:project
  test('View issues on a project with one filter', (done) => {
    chai
      .request(server)
      .get('/api/issues/project2')
      .query({ open: true })
      .end((err, res) => {

        // status and length
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.length, 2);
        
        // res.body[0]
        assert.equal(res.body[0].assigned_to, 'makoto');
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0]._id, '63afb4acf9b116416156dfa8');
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'admin');
        assert.equal(res.body[0].created_on, '2022-12-31T04:03:56.124Z');
        assert.equal(res.body[0].updated_on, '2022-12-31T04:03:56.124Z');

        // res.body[1]
        assert.equal(res.body[1].assigned_to, 'makoto');
        assert.equal(res.body[1].status_text, 'fixing');
        assert.equal(res.body[1].open, true);
        assert.equal(res.body[1]._id, '63afb880cbcc6d65c6d2a4de');
        assert.equal(res.body[1].issue_title, 'Bug-004');
        assert.equal(res.body[1].issue_text, 'Bug-004 text');
        assert.equal(res.body[1].created_by, 'admin');
        assert.equal(res.body[1].created_on, '2022-12-31T04:20:16.694Z');
        assert.equal(res.body[1].updated_on, '2022-12-31T04:20:16.694Z');

        done();
      });
  });

  // GET - URL/api/issues/:project
  test('View issues on a project with multiple filters', (done) => {
    chai
      .request(server)
      .get('/api/issues/project2')
      .query({
         open: true,
         issue_title: 'Bug-001',
         created_by: 'admin',
      })
      .end((err, res) => {

        // status and length
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.length, 1);
        
        // res.body[0]
        assert.equal(res.body[0].assigned_to, 'makoto');
        assert.equal(res.body[0].status_text, 'fixing');
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0]._id, '63afb4acf9b116416156dfa8');
        assert.equal(res.body[0].issue_title, 'Bug-001');
        assert.equal(res.body[0].issue_text, 'Bug-001 text');
        assert.equal(res.body[0].created_by, 'admin');
        assert.equal(res.body[0].created_on, '2022-12-31T04:03:56.124Z');
        assert.equal(res.body[0].updated_on, '2022-12-31T04:03:56.124Z');

        done();
      });
  });

  /* ------------------------------------------------------- 
  
  // PUT - URL/api/issues/:project
  test('Update one field on an issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/project3')
      .send({
        _id: '63afb4acf9b116416156dfa8',  // 1st document in my collection
        status_text: 'fixed',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, '63afb4acf9b116416156dfa8');
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update multiple fields on an issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/project3')
      .send({
        _id: '63afb4acf9b116416156dfa8',  // 1st document in my collection
        issue_text: 'new bug',
        assigned_to: 'takeshi',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, '63afb4acf9b116416156dfa8');
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with missing', (done) => {
    chai
      .request(server)
      .put('/api/issues/project3')
      .send({
        _id: '63afb4acf9b116416156dAAA',  // missing
        assigned_to: 'takeshi',
        status_text: 'fixed',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'could not update');
        assert.equal(res.body._id, '63afb4acf9b116416156dAAA');
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with no fields to update', (done) => {
    chai
      .request(server)
      .put('/api/issues/project3')
      .send({
        _id: '63afb4c8f9b116416156dfaa',  // 2nd document in my collection
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'no update field(s) sent');
        assert.equal(res.body._id, '63afb4c8f9b116416156dfaa');
        done();
      });
  });

  // PUT - URL/api/issues/:project
  test('Update an issue with an invalid', (done) => {
    chai
      .request(server)
      .put('/api/issues/project3')
      .send({
        _id: '63afb707cbcc6d65c6d2a4d5',  // 3rd document in my collection, open = false
        assigned_to: 'root',
        status_text: 'end',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, '63afb707cbcc6d65c6d2a4d5');
        done();
      });
  });

  /* ------------------------------------------------------- 

  // DELETE - URL/api/issues/:project
  test('Delete an issue', (done) => {
    chai
      .request(server)
      .delete('/api/issues/project4')
      .send({
        _id: '63afb4acf9b116416156dfa8',  // 1st document in my collection
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, '63afb4acf9b116416156dfa8');
        done();
      });
  });
  
  /* ------------------------------------------------------- */
  
});
