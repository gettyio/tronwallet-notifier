import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest.agent(app);

const valid = {
  to: '27UzaKnuqqHmfyzUChETgU1EoBqHy8rRoGk',
  from: '27khY3PteHw69bcfxUVUhFu373UWxJgiycV',
  token: 'TRX',
  amount: '1234'
};

const invalid = {
  to: '27UzaKnuqqHmfyzUChET======WRONG=====gU1EoBqHy8rRoGk',
  from: '27khY3PteHw69bcfx======WRONG=====UVUhFu373UWxJgiycV',
  token: 'T======WRONG=====RX',
  amount: '12======WRONG=====34'
};

describe.only('API Wallet Endpoints', () => {

  after((done) => {
    app.close(done);
  });

  it('should return error message when send an invalid "from" field', (done) => {
    request
      .post('/v1/wallet/transfer')
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

  it('should return error message when send an invalid "to" field', (done) => {
    request
      .post('/v1/wallet/transfer')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...valid, to: invalid.to })
      .end((err, res) => {
        const errorStack = JSON.parse(res.error.text);

        expect(res.statusCode).to.equal(400);
        expect(res.clientError).to.be.true;
        expect(errorStack.error).to.equal('Bad Request');

        expect(errorStack.message).to.equal('child "to" fails because ["to" should be a valid key]');

        done();
      });
  });

  it('should return error message when send an invalid "amount" field', (done) => {
    request
      .post('/v1/wallet/transfer')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...valid, amount: invalid.amount })
      .end((err, res) => {
        const errorStack = JSON.parse(res.error.text);

        expect(res.statusCode).to.equal(400);
        expect(res.clientError).to.be.true;
        expect(errorStack.error).to.equal('Bad Request');

        expect(errorStack.message).to.equal('child "amount" fails because ["amount" must be a number]');

        done();
      });
  });

  it('should return error message when send request without token', (done) => {
    request
      .post('/v1/wallet/transfer')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ ...valid, token: null })
      .end((err, res) => {
        const errorStack = JSON.parse(res.error.text);

        expect(res.statusCode).to.equal(400);
        expect(res.clientError).to.be.true;
        expect(errorStack.error).to.equal('Bad Request');

        expect(errorStack.message).to.equal('child "token" fails because ["token" must be a string]');

        done();
      });
  });

  it('should return error when send request without body', (done) => {
    request
      .post('/v1/wallet/transfer')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({})
      .end((err, res) => {
        const errorStack = JSON.parse(res.error.text);

        expect(res.statusCode).to.equal(400);
        expect(res.clientError).to.be.true;
        expect(errorStack.error).to.equal('Bad Request');

        done();
      });
  });

  it('should return a transaction hash when valid input is setted', (done) => {
    request
      .post('/v1/wallet/transfer')
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
