const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
/*
  // Timeout 5 seconds
  this.timeout(5000);

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

  // GET - URL/api/issues/:project
  test('View issues on a project', (done) => {
    chai
      .request(server)
      .get('/api/issues/project2')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.length, 4);
        assert.deepEqual(res.body[0], {
          _id: '63afb4acf9b116416156dfa8',
          issue_title: 'Bug-001',
          issue_text: 'Bug-001 text',
          created_by: 'admin',
          assigned_to: 'makoto',
          open: true,
          status_text: 'fixing',
          created_on: '2022-12-31T04:03:56.124+00:00',
          updated_on: '2022-12-31T04:03:56.124+00:00',
        });
        assert.deepEqual(res.body[1], {
          _id: '63afb4c8f9b116416156dfaa',
          issue_title: 'Bug-002',
          issue_text: 'Bug-002 text',
          created_by: 'admin',
          assigned_to: 'takeshi',
          open: false,
          status_text: 'fixed',
          created_on: '2022-12-31T04:04:24.789+00:00',
          updated_on: '2022-12-31T04:12:16.176+00:00',
        });
        done();
      });
  });
  
*/
});
