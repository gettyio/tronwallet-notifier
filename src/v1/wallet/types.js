import { Joi } from 'celebrate';
import { TransferContract } from '../../sdks/wallet-api-v2/protocol/core/Contract_pb';
import { decode58Check } from '../../sdks/wallet-api-v2/utils/crypto';

const _Joi = Joi.extend(joi => ({
  base: joi.string(),
  name: 'transfer',
  language: {
    from: 'should be a valid key',
    to: 'should be a valid key'
  },
  rules: [
    {
      name: 'from',
      validate(params, value, state, options) {
        try {
          const transferContract = new TransferContract();
          transferContract.setOwnerAddress(Uint8Array.from(decode58Check(value)));
          return value;
        } catch (e) {
          return this.createError('transfer.from', {}, state, options);
        }
      }
    },
    {
      name: 'to',
      validate(params, value, state, options) {
        try {
          const transferContract = new TransferContract();
          transferContract.setToAddress(Uint8Array.from(decode58Check(value)));
          return value;
        } catch (e) {
          return this.createError('transfer.to', {}, state, options);
        }
      }
    }
  ]
}));

export default _Joi;
