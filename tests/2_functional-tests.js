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
*/
});
