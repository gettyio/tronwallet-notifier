import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest.agent(app);

const valid = {
  from: '27khY3PteHw69bcfxUVUhFu373UWxJgiycV',
  votes: {
    '27ZrUckfiCAmja6RCVLzHHQ8XoF7e5wKcAQ': 1,
    '27WDUwfv7FzWmNuj4rbrmRjxQvgHnC46Kcf': 1,
    '27WK11uSBUjxmnbtQ3AArs1hLpUkPg4WAJF': 1
  }
};

const invalid = {
  from: '27khY3PteHw69bcfx======WRONG=====UVUhFu373UWxJgiycV',
  votes: {
    x: 1
  }
};

describe('API Wallet Vote Endpoints', () => {

  after((done) => {
    app.close(done);
  });

  it('should return error message when send an invalid "from" field', (done) => {
    request
      .post('/v1/wallet/vote')
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

  it('should return error when send request without body', (done) => {
    request
      .post('/v1/wallet/vote')
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
      .post('/v1/wallet/vote')
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
