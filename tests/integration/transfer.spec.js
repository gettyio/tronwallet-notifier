import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app';

describe('Transfer endpoints', () => {
  it('should return success code when check status', (done) => {
    request(app)
      .get('/status')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
