process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server.js');
const knex = require('../../db/connection');

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

});


describe('POST /register', () => {
  it('should register a new user', (done) => {
    chai.request(server)
    .post('/register')
    .send({
      username: 'michael',
      password: 'herman'
    })
    .end((err, res) => {
      console.log('hi')
      should.not.exist(err);
      res.redirects.length.should.eql(0);
      res.status.should.eql(200);
      res.type.should.eql('application/json');
      res.body.status.should.eql('success');
      done();
    });
  });
});