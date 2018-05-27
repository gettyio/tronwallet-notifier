import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest.agent(app);

const valid = {
  from: '27khY3PteHw69bcfxUVUhFu373UWxJgiycV',
  form: {
    name: 'MRX',
    totalSupply: 0,
    description: 'Marlon Root Xchange',
    url: 'http://getty.io',
    trxNum: 1,
    num: 1,
    startTime: '2018',
    endTime: '2019',
    freezeAmount: 0,
    freezeDays: 1,
    acceptTerms: false
  }
};

const invalid = {
  from: '27khY3PteHw69bcfxUVUhF=====WRONG====u373UWxJgiycV',
  form: {
    name: 'MRX',
    totalSupply: -3,
    description: 'Marlon Root Xchange',
    url: 'http://getty.io',
    trxNum: -1,
    num: -1,
    startTime: '2018',
    endTime: '2019',
    freezeAmount: -1,
    freezeDays: -1,
    acceptTerms: false
  }
};

describe('API Wallet Create Token Endpoints', () => {
  it('should return error message when send an invalid "from" field', (done) => {
    request
      .post('/v1/wallet/create-token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...valid, from: invalid.from })
      .end((err, res) => {
        const errorStack = JSON.parse(res.error.text);

        expect(res.statusCode).to.equal(400);
        expect(res.clientError).to.be.true;
        expect(errorStack.error).to.equal('Bad Request');

        expect(errorStack.message).to.equal('child "from" fails because ["from" should be a valid key]');

        done();
      });
  });

  // ToDo: Create test case for form situations

  it('should return a transaction hash when valid input is setted', (done) => {
    request
      .post('/v1/wallet/create-token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(valid)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.clientError).to.be.false;

        expect(res.body.transaction).to.be.a('string').and.have.length.greaterThan(20);
        done();
      });
  });
});
