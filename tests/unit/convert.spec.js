import { expect } from 'chai';
import { getRates, convert } from '../../src/utils/helpers';

describe.only('Convertion functions', () => {
  it('should return success code when check status', (done) => {
    convert(1, 'USD', 'BRL')
      .then((res) => {
        console.log(res, '<<< RES');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
