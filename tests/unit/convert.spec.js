import { expect } from 'chai';
import { getRates, convert } from '../../src/utils/helpers';

describe('Convertion functions', () => {
  it('should return success code when check status', (done) => {
    convert(1, 'USD', 'BRL')
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
